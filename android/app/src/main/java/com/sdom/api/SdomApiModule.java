package com.sdom.api;

import android.app.WallpaperManager;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.AsyncTask;
import android.widget.Toast;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;

import androidx.annotation.NonNull;

public class SdomApiModule extends ReactContextBaseJavaModule {
    private static ReactApplicationContext reactContext;

    private static final String DURATION_SHORT_KEY = "SHORT";
    private static final String DURATION_LONG_KEY = "LONG";

    public SdomApiModule(ReactApplicationContext context) {
        super(context);
        reactContext = context;
    }

    @NonNull
    @Override
    public String getName() {
        return "SdomApi";
    }

    /**
     * @param inUrl
     */
    @ReactMethod
    public void setPostAsWallPaper(String inUrl, String inCategoryTitle) {
        try {
            new AsyncWallPaper(reactContext).execute(inUrl, inCategoryTitle);
        } catch (Exception exception) {
            exception.printStackTrace();
        }
    }

    /**
     *
     */
    private class AsyncWallPaper extends AsyncTask<String, Void, Boolean> {

        private ReactApplicationContext mContext;
        private String mPostTitle;

        private AsyncWallPaper(ReactApplicationContext reactApplicationContext) {
            this.mContext = reactApplicationContext;
        }

        /**
         * @param src
         * @return
         */
        private Bitmap getBitmapFromURL(String src) throws IOException {
            HttpURLConnection connection = (HttpURLConnection) new URL(src).openConnection();
            connection.setDoInput(true);
            connection.connect();
            InputStream input = connection.getInputStream();
            return BitmapFactory.decodeStream(input);
        }

        @Override
        protected Boolean doInBackground(String... inParameters) {
            try {
                mPostTitle = inParameters[1];
                Bitmap wallPaperBitmap = getBitmapFromURL(inParameters[0]);
                WallpaperManager wallpaperManager = WallpaperManager.getInstance(mContext);
                wallpaperManager.setBitmap(wallPaperBitmap, null, true, WallpaperManager.FLAG_LOCK | WallpaperManager.FLAG_SYSTEM);
                return true;
            } catch (IOException exception) {
                System.out.println(exception.getMessage());
            }
            return false;
        }

        @Override
        protected void onPostExecute(Boolean inResult) {
            Toast.makeText(mContext, (inResult ? "Wallpaper set for " : "Error setting wallpaper for ") + mPostTitle + " !", Toast.LENGTH_SHORT).show();
        }
    }
}
