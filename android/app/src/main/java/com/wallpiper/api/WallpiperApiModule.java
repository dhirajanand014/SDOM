package com.wallpiper.api;

import android.app.Notification;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.app.WallpaperManager;
import android.content.ContentResolver;
import android.content.ContentValues;
import android.content.Context;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.net.Uri;
import android.os.AsyncTask;
import android.os.Build;
import android.os.Environment;
import android.provider.MediaStore;
import android.text.TextUtils;
import android.webkit.MimeTypeMap;
import android.widget.Toast;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.wallpiper.R;
import com.wallpiper.constants.Constants;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Objects;

import androidx.annotation.NonNull;
import androidx.core.app.NotificationCompat;
import androidx.core.content.FileProvider;

public class WallpiperApiModule extends ReactContextBaseJavaModule {

    private static ReactApplicationContext reactContext;

    public WallpiperApiModule(ReactApplicationContext context) {
        super(context);
        reactContext = context;
    }

    @NonNull
    @Override
    public String getName() {
        return "WallPiperApi";
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

    /**
     * Method to download image from the link and display intent categories with image sharable applications of device onclick of the
     * share link.
     *
     * @param inImageURL
     * @param inTitle
     */
    @ReactMethod
    public void shareImage(String inImageURL, String inTitle) {
        try {
            Bitmap imageBitmap = getBitmapFromURL(inImageURL);

            String imagePath = MediaStore.Images.Media.insertImage(reactContext.getContentResolver(), imageBitmap, inTitle, null);
            Uri bitmapUri = Uri.parse(imagePath);

            Intent intent = new Intent(Intent.ACTION_SEND);
            intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            intent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
            intent.setType(Constants.SHARE_IMAGE_TYPE);
            intent.putExtra(Intent.EXTRA_STREAM, bitmapUri);
            intent.putExtra(Intent.EXTRA_TEXT, inTitle);

            Intent chooserIntent = Intent.createChooser(intent, Constants.SHARE_VIA);
            chooserIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);

            reactContext.startActivity(chooserIntent);
        } catch (Exception exception) {
            Toast.makeText(reactContext, "Cannot share image for " + inTitle, Toast.LENGTH_SHORT).show();
        }
    }

    /**
     * Method to download image to the device from the download link on click of the download link.
     *
     * @param inUrl
     * @param inCategoryTitle
     * @param postRequestType
     */
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
     * Get the bitmap image from the URL passed by the UI component.
     *
     * @param src
     * @return
     */
    private static Bitmap getBitmapFromURL(String src) throws IOException {
        HttpURLConnection connection = (HttpURLConnection) new URL(src).openConnection();
        connection.setDoInput(true);
        connection.connect();
        InputStream input = connection.getInputStream();
        return BitmapFactory.decodeStream(input);
    }

    /**
     * Get the URL and the Post category title to set the wallpaper or the lock Screen image.
     */
    private static class AsyncSetImage extends AsyncTask<String, Integer, String> {

        private ReactApplicationContext mContext;
        private String mPostTitle;
        private NotificationManager notificationManager;
        private NotificationCompat.Builder notificationBuilder;

        private AsyncSetImage(ReactApplicationContext reactApplicationContext) {
            this.mContext = reactApplicationContext;
        }

        @Override
        protected void onProgressUpdate(Integer... values) {
            super.onProgressUpdate(values);
            if (null != notificationBuilder && null != notificationManager) {
                Integer progressValue = values[Constants.INT_ZERO];
                if (Constants.INT_HUNDRED.equals(progressValue)) {
                    notificationBuilder.setContentText(Constants.DOWNLOAD_COMPLETE)
                            .setOngoing(false)
                            .setProgress(Constants.INT_ZERO,
                                    Constants.INT_HUNDRED, false);
                    Intent intent = new Intent();
                    intent.setAction(Intent.ACTION_VIEW);

                    File downloadImageFile = new File(Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DOWNLOADS +
                            File.separator + Constants.WALLPIPER), mPostTitle + ".png");
                    Uri uri = FileProvider.getUriForFile(mContext, mContext.getApplicationContext().getPackageName()
                            + ".provider", downloadImageFile);
                    intent.setDataAndType(uri, MimeTypeMap.getSingleton().getMimeTypeFromExtension("png"));
                    intent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);

                    PendingIntent activity = PendingIntent.getActivity(mContext, 0, intent,
                            0);
                    notificationBuilder.setDefaults(Notification.DEFAULT_VIBRATE | Notification.DEFAULT_SOUND);
                    notificationBuilder.setContentIntent(activity);
                } else {
                    notificationBuilder.setProgress(Constants.INT_HUNDRED, progressValue, false);
                }
                notificationManager.notify(Constants.NOTIFICATION_ID, notificationBuilder.build());
            }
        }

        @Override
        protected String doInBackground(String... inParameters) {
            try {
                Bitmap bitmapImage = getBitmapFromURL(inParameters[Constants.INT_ZERO]);
                mPostTitle = inParameters[Constants.INT_ONE];
                if (inParameters[Constants.INT_TWO].equals(Constants.POST_WALLPAPER_SET)) {
                    WallpaperManager wallpaperManager = WallpaperManager.getInstance(mContext);
                    wallpaperManager.setBitmap(bitmapImage, null, true,
                            WallpaperManager.FLAG_LOCK | WallpaperManager.FLAG_SYSTEM);
                    return Constants.POST_WALLPAPER_SET;
                } else if (inParameters[Constants.INT_TWO].equals(Constants.POST_IMAGE_DOWNLOAD)) {
                    initNotification(bitmapImage);
                    return downloadImage(bitmapImage);
                }
            } catch (IOException exception) {
                Toast.makeText(reactContext, "Cannot set image " + mPostTitle +
                        " as wallpaper or the lockScreen", Toast.LENGTH_SHORT).show();
            }
            return Constants.EMPTY;
        }

        /**
         * Initialize the notification to be shown before download starts.
         *
         * @param bitmapImage
         */
        private void initNotification(Bitmap bitmapImage) {
            notificationBuilder =
                    new NotificationCompat.Builder(reactContext, Constants.NOTIFICATION_CHANNEL_ID).setSmallIcon(R.drawable.ic_post_download)
                            .setContentTitle(mPostTitle)
                            .setContentText(Constants.DOWNLOADING_IMAGE_OF + mPostTitle)
                            .setLargeIcon(bitmapImage)
                            .setStyle(new NotificationCompat.BigPictureStyle()
                                    .bigPicture(bitmapImage)
                                    .bigLargeIcon(null))
                            .setLocalOnly(true)
                            .setPriority(NotificationCompat.PRIORITY_HIGH)
                            .setCategory(Notification.CATEGORY_MESSAGE)
                            .setAutoCancel(true)
                            .setOnlyAlertOnce(true)
                            .setOngoing(true).setProgress(Constants.INT_HUNDRED, Constants.INT_ZERO, false);
            notificationManager = (NotificationManager) reactContext.getSystemService(Context.NOTIFICATION_SERVICE);
            notificationManager.notify(Constants.NOTIFICATION_ID, notificationBuilder.build());
        }

        /**
         * Download the image from the URL and place it in the downloads folder.
         *
         * @param bitmapImage
         * @return
         * @throws IOException
         */
        private String downloadImage(Bitmap bitmapImage) throws IOException {
            OutputStream fileOutputStream;
            boolean result = false;
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
                publishProgress(Constants.INT_TWENTY);
                ContentResolver contentResolver = reactContext.getContentResolver();
                ContentValues contentValues = new ContentValues();
                contentValues.put(MediaStore.Images.Media.DISPLAY_NAME, mPostTitle + ".png");
                contentValues.put(MediaStore.Images.Media.MIME_TYPE, Constants.SHARE_IMAGE_TYPE);
                contentValues.put(MediaStore.Images.Media.IS_PENDING, true);
                contentValues.put(MediaStore.Downloads.RELATIVE_PATH, String.join(File.separator,
                        Environment.DIRECTORY_DOWNLOADS, Constants.WALLPIPER));
                Uri imageInsert = contentResolver.insert(MediaStore.Downloads.EXTERNAL_CONTENT_URI, contentValues);
                if (null != imageInsert) {
                    publishProgress(Constants.INT_FORTY);
                    fileOutputStream = contentResolver.openOutputStream(Objects.requireNonNull(imageInsert));
                    result = saveImageFromURL(bitmapImage, fileOutputStream);
                    publishProgress(Constants.INT_EIGHTY);
                    contentValues.put(MediaStore.Images.Media.IS_PENDING, false);
                    reactContext.getContentResolver().update(imageInsert, contentValues, null, null);
                }
            } else {
                publishProgress(Constants.INT_TWENTY);
                File downloadsFolderDirectory = Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DOWNLOADS +
                        File.separator + Constants.WALLPIPER);
                if (!downloadsFolderDirectory.exists())
                    downloadsFolderDirectory.mkdirs();
                File downloadImageFile = new File(downloadsFolderDirectory, mPostTitle + ".png");
                fileOutputStream = new FileOutputStream(downloadImageFile);
                publishProgress(Constants.INT_FORTY);
                result = saveImageFromURL(bitmapImage, fileOutputStream);
                publishProgress(Constants.INT_EIGHTY);
                if (result && !TextUtils.isEmpty(downloadImageFile.getAbsolutePath())) {
                    ContentValues values = createContentValues();
                    values.put(MediaStore.Images.Media.DATA, downloadImageFile.getAbsolutePath());
                    reactContext.getContentResolver().insert(MediaStore.Images.Media.EXTERNAL_CONTENT_URI, values);
                }
            }
            publishProgress(Constants.INT_HUNDRED);
            return result ? Constants.POST_IMAGE_DOWNLOAD : Constants.EMPTY;
        }

        /**
         * Create content values after download.
         *
         * @return
         */
        private ContentValues createContentValues() {
            ContentValues values = new ContentValues();
            values.put(MediaStore.Images.Media.MIME_TYPE, Constants.SHARE_IMAGE_TYPE);
            values.put(MediaStore.Images.Media.DATE_ADDED, System.currentTimeMillis() / Constants.INT_THOUSAND);
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
                bitmapImage.compress(Bitmap.CompressFormat.PNG, Constants.INT_HUNDRED, fileOutputStream);
                fileOutputStream.close();
                return true;
            }
            return false;
        }

        @Override
        protected void onPostExecute(String inResult) {
            String message = Constants.EMPTY;
            if (Constants.POST_WALLPAPER_SET.equals(inResult)) {
                message = "Wallpaper set for " + mPostTitle + "!";
            } else if (Constants.POST_IMAGE_DOWNLOAD.equals(inResult)) {
                message = "Downloaded file for " + mPostTitle + "!";
            }
            if (!TextUtils.isEmpty(message))
                Toast.makeText(mContext, message, Toast.LENGTH_SHORT).show();
        }
    }
}
