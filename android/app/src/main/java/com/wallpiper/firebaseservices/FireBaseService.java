package com.wallpiper.firebaseservices;

import android.app.Notification;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.text.TextUtils;
import android.util.Log;
import android.widget.Toast;

import com.google.firebase.messaging.FirebaseMessagingService;
import com.google.firebase.messaging.RemoteMessage;
import com.wallpiper.MainActivity;
import com.wallpiper.R;
import com.wallpiper.constants.Constants;

import androidx.annotation.NonNull;
import androidx.core.app.NotificationCompat;

public class FireBaseService extends FirebaseMessagingService {
    @Override
    public void onNewToken(@NonNull String inToken) {
        super.onNewToken(inToken);
        Log.i("Token received OK", Constants.EMPTY);
    }

    @Override
    public void onMessageReceived(@NonNull RemoteMessage remoteMessage) {
        try {
            RemoteMessage.Notification notification = remoteMessage.getNotification();
            if (null != notification) {
                String title = remoteMessage.getNotification().getTitle();
                NotificationCompat.Builder notificationBuilder =
                        new NotificationCompat.Builder(this, Constants.NOTIFICATION_CHANNEL_ID)
                                .setSmallIcon(R.drawable.ic_post_download)
                                .setContentTitle(!TextUtils.isEmpty(title) ? title : "New Post")
                                .setContentText(remoteMessage.getNotification().getBody())
                                // .setLargeIcon(bitmapImage)
                                .setStyle(new NotificationCompat.BigPictureStyle()
                                        // .bigPicture(bitmapImage)
                                        .bigLargeIcon(null))
                                .setLocalOnly(true)
                                .setDefaults(Notification.DEFAULT_SOUND | Notification.DEFAULT_VIBRATE) //Important for heads-up notification
                                .setPriority(Notification.PRIORITY_MAX) //Important for heads-up notification
                                .setCategory(Notification.CATEGORY_MESSAGE)
                                .setAutoCancel(true)
                                .setOnlyAlertOnce(true);

                Intent intent = new Intent(this, MainActivity.class);
                intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);

                PendingIntent activity = PendingIntent.getActivity(this, 0, intent,
                        0);
                notificationBuilder.setContentIntent(activity);

                NotificationManager notificationManager = (NotificationManager) this.getSystemService(Context.NOTIFICATION_SERVICE);
                notificationManager.notify(Constants.NOTIFICATION_ID, notificationBuilder.build());
            }
        } catch (Exception e) {
            Toast.makeText(this, "Error displaying the notification of post!", Toast.LENGTH_SHORT).show();
        }
    }
}
