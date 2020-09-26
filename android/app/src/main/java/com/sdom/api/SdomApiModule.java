package com.sdom.api;

import android.app.WallpaperManager;
import android.content.ContentResolver;
import android.content.ContentValues;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.net.Uri;
import android.os.AsyncTask;
import android.os.Build;
import android.os.Environment;
import android.provider.MediaStore;
import android.text.TextUtils;
import android.widget.Toast;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.sdom.constants.SdomConstants;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Objects;

import androidx.annotation.NonNull;

public class SdomApiModule extends ReactContextBaseJavaModule {

    private static ReactApplicationContext reactContext;

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
     * Set the Wallpaper and the lock screen Image when the user clicks of
     * the Ok button of the wallpaper setting modal panel.
     *
     * @param inUrl
     */
    @ReactMethod
    public void setPostAsWallPaper(String inUrl, String inCategoryTitle, String postRequestType) {
        try {
            new AsyncSetImage(reactContext).execute(inUrl, inCategoryTitle, postRequestType);
        } catch (Exception exception) {
            Toast.makeText(reactContext, "Cannot set image " + inCategoryTitle +
                    " as wallpaper or the lockScreen", Toast.LENGTH_SHORT).show();
        }
    }

    @ReactMethod
    public void downloadPostImage(String inUrl, String inCategoryTitle, String postRequestType) {
        try {
            new AsyncSetImage(reactContext).execute(inUrl, inCategoryTitle, postRequestType);
        } catch (Exception exception) {
            Toast.makeText(reactContext, "Cannot download image for "
                    + inCategoryTitle, Toast.LENGTH_SHORT).show();
        }
    }


    /**
     * Get the URL and the Post category title to set the wallpaper or the lock Screen image.
     */
    private class AsyncSetImage extends AsyncTask<String, Void, Boolean> {

        private ReactApplicationContext mContext;
        private String mPostTitle;

        private AsyncSetImage(ReactApplicationContext reactApplicationContext) {
            this.mContext = reactApplicationContext;
        }

        /**
         * Get the bitmap image from the URL passed by the UI component.
         *
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
                Bitmap bitmapImage = getBitmapFromURL(inParameters[0]);
                mPostTitle = inParameters[1];
                if (inParameters[2].equals(SdomConstants.POST_WALLPAPER_SET)) {
                    WallpaperManager wallpaperManager = WallpaperManager.getInstance(mContext);
                    wallpaperManager.setBitmap(bitmapImage, null, true,
                            WallpaperManager.FLAG_LOCK | WallpaperManager.FLAG_SYSTEM);
                    return true;
                } else if (inParameters[2].equals(SdomConstants.POST_IMAGE_DOWNLOAD)) {
                    return downloadImage(bitmapImage);
                }
            } catch (IOException exception) {
                Toast.makeText(reactContext, "Cannot set image " + mPostTitle +
                        " as wallpaper or the lockScreen", Toast.LENGTH_SHORT).show();
            }
            return false;
        }

        /**
         * Download the image from the URL and place it in the downloads folder.
         *
         * @param bitmapImage
         * @return
         * @throws IOException
         */
        private boolean downloadImage(Bitmap bitmapImage) throws IOException {
            OutputStream fileOutputStream;
            boolean result = false;
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
                ContentResolver contentResolver = reactContext.getContentResolver();
                ContentValues contentValues = new ContentValues();
                contentValues.put(MediaStore.Images.Media.DISPLAY_NAME, mPostTitle + ".png");
                contentValues.put(MediaStore.Images.Media.MIME_TYPE, "images/png");
                contentValues.put(MediaStore.Images.Media.IS_PENDING, true);
                contentValues.put(MediaStore.Downloads.RELATIVE_PATH, String.join(File.separator,
                        Environment.DIRECTORY_DOWNLOADS, SdomConstants.STARDOM));
                Uri imageInsert = contentResolver.insert(MediaStore.Downloads.EXTERNAL_CONTENT_URI, contentValues);
                if (null != imageInsert) {
                    fileOutputStream = contentResolver.openOutputStream(Objects.requireNonNull(imageInsert));
                    result = saveImageFromURL(bitmapImage, fileOutputStream);
                    contentValues.put(MediaStore.Images.Media.IS_PENDING, false);
                    reactContext.getContentResolver().update(imageInsert, contentValues, null, null);
                }
            } else {
                File downloadsFolderDirectory = Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DOWNLOADS +
                        File.separator + SdomConstants.STARDOM);
                if (!downloadsFolderDirectory.exists())
                    downloadsFolderDirectory.mkdirs();
                File downloadImageFile = new File(downloadsFolderDirectory, mPostTitle + ".png");
                fileOutputStream = new FileOutputStream(downloadImageFile);
                result = saveImageFromURL(bitmapImage, fileOutputStream);
                if (result && !TextUtils.isEmpty(downloadImageFile.getAbsolutePath())) {
                    ContentValues values = createContentValues();
                    values.put(MediaStore.Images.Media.DATA, downloadImageFile.getAbsolutePath());
                    reactContext.getContentResolver().insert(MediaStore.Images.Media.EXTERNAL_CONTENT_URI, values);
                }
            }
            return result;
        }

        /**
         * Create content values after download.
         *
         * @return
         */
        private ContentValues createContentValues() {
            ContentValues values = new ContentValues();
            values.put(MediaStore.Images.Media.MIME_TYPE, "image/png");
            values.put(MediaStore.Images.Media.DATE_ADDED, System.currentTimeMillis() / 1000);
            values.put(MediaStore.Images.Media.DATE_TAKEN, System.currentTimeMillis());
            return values;
        }

        /**
         * Save Image to Downloads folder from URL.
         *
         * @param bitmapImage
         * @param fileOutputStream
         * @return
         * @throws IOException
         */
        private boolean saveImageFromURL(Bitmap bitmapImage, OutputStream fileOutputStream) throws IOException {
            if (null != fileOutputStream) {
                bitmapImage.compress(Bitmap.CompressFormat.PNG, 100, fileOutputStream);
                fileOutputStream.close();
                return true;
            }
            return false;
        }

        @Override
        protected void onPostExecute(Boolean inResult) {
            Toast.makeText(mContext, (inResult ? "Wallpaper set for " : "Error setting wallpaper for ") + mPostTitle + " !", Toast.LENGTH_SHORT).show();
        }
    }
}
