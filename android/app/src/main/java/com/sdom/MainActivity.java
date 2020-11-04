package com.sdom;

import android.app.Activity;
import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.os.Build;
import android.os.Bundle;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.google.firebase.messaging.FirebaseMessaging;
import com.sdom.constants.SdomConstants;

import androidx.annotation.Nullable;

public class MainActivity extends ReactActivity {


    /**
     * Returns the name of the main component registered from JavaScript. This is used to schedule
     * rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "SDOM";
    }

    public static class NavigationScreenDelegate extends ReactActivityDelegate {
        private static final String NAVIGATION_ROUTE = "navigationRoute";
        private static final String INITIAL_CATEGORY_SELECTION = "initialCategorySelection";
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
                if (bundle != null && bundle.containsKey(NAVIGATION_ROUTE)) {
                    mInitialProps = new Bundle();
                    // put any initialProps here
                    mInitialProps.putString(NAVIGATION_ROUTE, bundle.getString(NAVIGATION_ROUTE));
                    if ("Intro".equalsIgnoreCase(bundle.getString(NAVIGATION_ROUTE))) {
                        mInitialProps.putBoolean(INITIAL_CATEGORY_SELECTION, true);
                    }
                }
                createSdomNotificationChannel();
                subscribeToFireBaseTopic();
                super.onCreate(savedInstanceState);
            }
        }

        @Override
        protected Bundle getLaunchOptions() {
            return mInitialProps;
        }

        /**
         * Create notification channels for post button actions.
         */
        private void createSdomNotificationChannel() {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                NotificationChannel notificationChannel = new NotificationChannel(SdomConstants.SDOM_NOTIFICATION_CHANNEL_ID,
                        SdomConstants.SDOM_NOTIFICATION_CHANNEL_NAME, NotificationManager.IMPORTANCE_LOW);
                notificationChannel.enableVibration(true);
                notificationChannel.setLockscreenVisibility(Notification.VISIBILITY_PUBLIC);
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
                    notificationChannel.setAllowBubbles(true);
                }
                notificationChannel.setDescription("Channel for displaying SDOM notifications for post actions");

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
        FirebaseMessaging.getInstance().subscribeToTopic(SdomConstants.FIREBASE_MESSAGING_TOPIC_NEW_POST);
    }

    /**
     * Allow device to unsubscribe to new post notifications to a specific topic.
     */
    private void unSubscribeToFireBaseTopic() {
        FirebaseMessaging.getInstance().unsubscribeFromTopic(SdomConstants.FIREBASE_MESSAGING_TOPIC_NEW_POST);
    }

}
