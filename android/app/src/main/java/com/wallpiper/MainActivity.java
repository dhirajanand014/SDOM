package com.wallpiper;

import android.app.Activity;
import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.content.Intent;
import android.os.Build;
import android.os.Bundle;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.google.firebase.messaging.FirebaseMessaging;
import com.wallpiper.constants.Constants;

import androidx.annotation.Nullable;

public class MainActivity extends ReactActivity {


    /**
     * Returns the name of the main component registered from JavaScript. This is used to schedule
     * rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "WallPiper";
    }

    public static class NavigationScreenDelegate extends ReactActivityDelegate {
        private Bundle mInitialProps = null;
        private final @Nullable
        Activity mActivity;

        public NavigationScreenDelegate(Activity activity, String mainComponentName) {
            super(activity, mainComponentName);
            this.mActivity = activity;
        }

        @Override
        protected void onCreate(Bundle savedInstanceState) {
            // bundle is where we put our alarmID with launchIntent.putExtra
            if (null != mActivity) {
                Bundle bundle = mActivity.getIntent().getExtras();
                if (bundle != null) {
                    mInitialProps = new Bundle();
                    // put any initialProps here
                    putBundleList(bundle);
                }
                createNotificationChannel();
                subscribeToFireBaseTopic();
                super.onCreate(savedInstanceState);
            }
        }

        /**
         * Add activity extras as bundle to the main application.
         *
         * @param bundle
         */
        private void putBundleList(Bundle bundle) {
            if (bundle.containsKey(Constants.NAVIGATION_ROUTE)) {
                mInitialProps.putString(Constants.NAVIGATION_ROUTE, bundle.getString(Constants.NAVIGATION_ROUTE));
                if (Constants.INTRO.equalsIgnoreCase(bundle.getString(Constants.NAVIGATION_ROUTE))) {
                    mInitialProps.putBoolean(Constants.INITIAL_CATEGORY_SELECTION, true);
                }
                if (bundle.containsKey(Constants.POST_ID_FROM_NOTIFICATION)) {
                    mInitialProps.putInt(Constants.POST_ID_FROM_NOTIFICATION,
                            Integer.parseInt(bundle.getString(Constants.POST_ID_FROM_NOTIFICATION)));
                }
            }
        }

        @Override
        protected Bundle getLaunchOptions() {
            return mInitialProps;
        }

        /**
         * Create notification channels for post button actions.
         */
        private void createNotificationChannel() {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                NotificationChannel notificationChannel = new NotificationChannel(Constants.NOTIFICATION_CHANNEL_ID,
                        Constants.NOTIFICATION_CHANNEL_NAME, NotificationManager.IMPORTANCE_LOW);
                notificationChannel.enableVibration(true);
                notificationChannel.setLockscreenVisibility(Notification.VISIBILITY_PUBLIC);
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
                    notificationChannel.setAllowBubbles(true);
                }
                notificationChannel.setDescription("Channel for displaying Wallpiper notifications for post actions");

                NotificationManager notificationManager = getContext().getSystemService(NotificationManager.class);
                notificationManager.createNotificationChannel(notificationChannel);
            }
        }
    }

    @Override
    protected ReactActivityDelegate createReactActivityDelegate() {
        return new NavigationScreenDelegate(this, getMainComponentName());
    }

    @Override
    protected void onDestroy() {
        unSubscribeToFireBaseTopic();
        super.onDestroy();
    }

    /**
     * Allow device to subscribe to new post notifications to a specific topic.
     */
    private static void subscribeToFireBaseTopic() {
        FirebaseMessaging.getInstance().subscribeToTopic(Constants.FIREBASE_MESSAGING_TOPIC_NEW_POST);
    }

    /**
     * Allow device to unsubscribe to new post notifications to a specific topic.
     */
    private void unSubscribeToFireBaseTopic() {
        FirebaseMessaging.getInstance().unsubscribeFromTopic(Constants.FIREBASE_MESSAGING_TOPIC_NEW_POST);
    }

    @Override
    public void onNewIntent(Intent intent) {
        super.onNewIntent(intent); // Propagate.
        setIntent(intent); // Passing the new intent to setIntent() means this new intent will be the one returned whenever getIntent() is called.
    }
}
