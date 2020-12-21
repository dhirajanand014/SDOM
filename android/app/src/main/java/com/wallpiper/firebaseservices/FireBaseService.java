package com.wallpiper.firebaseservices;

import android.app.Notification;
import android.app.PendingIntent;
import android.content.Intent;
import android.graphics.BitmapFactory;
import android.os.Bundle;
import android.text.TextUtils;
import android.util.Log;
import android.widget.Toast;

import com.google.firebase.messaging.FirebaseMessagingService;
import com.google.firebase.messaging.RemoteMessage;
import com.wallpiper.MainActivity;
import com.wallpiper.R;
import com.wallpiper.constants.Constants;
import com.wallpiper.enums.NotificationType;
import com.wallpiper.helper.WallPiperHelper;

import java.util.Set;

import androidx.annotation.NonNull;
import androidx.core.app.NotificationCompat;
import androidx.core.app.NotificationManagerCompat;

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
                Set<String> keys = remoteMessage.getData().keySet();
                if (keys.contains(Constants.NOTIFICATION_TYPE)) {
                    NotificationCompat.Builder notificationBuilder = new NotificationCompat.Builder(this, Constants.NOTIFICATION_CHANNEL_ID);
                    String notificationType = remoteMessage.getData().get(Constants.NOTIFICATION_TYPE);
                    if (NotificationType.NEW_POST.getNotificationType().equals(notificationType) &&
                            !WallPiperHelper.isCategoryEmpty(getApplicationContext())) {

                        notificationBuilder = newPostNotification(remoteMessage, notificationBuilder);

                        NotificationManagerCompat notificationManager = NotificationManagerCompat.from(this);
                        notificationManager.notify(Constants.NOTIFICATION_ID, notificationBuilder.build());
                    }
                }
            }
        } catch (Exception e) {
            Toast.makeText(this, "Error displaying the notification of post!", Toast.LENGTH_SHORT).show();
        }
    }

    /**
     * Build New Post notification with title and image.
     *
     * @param remoteMessage
     * @param notificationBuilder
     * @return
     */
    private NotificationCompat.Builder newPostNotification(@NonNull RemoteMessage remoteMessage,
                                                           NotificationCompat.Builder notificationBuilder) {
        String postId = remoteMessage.getData().get(Constants.POST_ID);
        String title = remoteMessage.getNotification().getTitle();
        notificationBuilder.setSmallIcon(R.drawable.ic_wallpiper_notification)
                .setContentTitle(!TextUtils.isEmpty(title) ? title : Constants.NEW_POST)
                .setContentText(remoteMessage.getNotification().getBody())
                .setLargeIcon(BitmapFactory.decodeResource(getResources(), R.drawable.ic_wallpiper_notification))
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
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK | Intent.FLAG_ACTIVITY_CLEAR_TOP);

        Bundle extras = new Bundle();
        extras.putString(Constants.POST_ID_FROM_NOTIFICATION, postId);
        extras.putString(Constants.NAVIGATION_ROUTE, Constants.GLANCE);

        intent.putExtras(extras);
        PendingIntent activity = PendingIntent.getActivity(this, 0, intent,
                PendingIntent.FLAG_UPDATE_CURRENT);
        return notificationBuilder.setContentIntent(activity);
    }
}
