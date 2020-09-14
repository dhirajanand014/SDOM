package com.sdom;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.widget.Toast;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;

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
                }
                super.onCreate(savedInstanceState);
            }
        }

        @Override
        protected Bundle getLaunchOptions() {
            Toast.makeText(this.getContext(),mInitialProps.get(NAVIGATION_ROUTE).toString(), Toast.LENGTH_SHORT);
            return mInitialProps;
        }
    }
    @Override
    protected ReactActivityDelegate createReactActivityDelegate() {
        return new NavigationScreenDelegate(this, getMainComponentName());
    }
}
