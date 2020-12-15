package com.wallpiper;

import android.animation.ObjectAnimator;
import android.animation.PropertyValuesHolder;
import android.animation.ValueAnimator;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.database.sqlite.SQLiteDatabase;
import android.net.ConnectivityManager;
import android.os.Bundle;
import android.text.TextUtils;
import android.view.Gravity;
import android.view.View;
import android.widget.TextView;

import com.google.android.material.snackbar.Snackbar;
import com.reactnativecommunity.asyncstorage.AsyncLocalStorageUtil;
import com.reactnativecommunity.asyncstorage.ReactDatabaseSupplier;

import java.util.Observable;
import java.util.Observer;

import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.AppCompatImageView;
import androidx.core.content.ContextCompat;

/**
 * Main class for splash screen.
 */
public class SplashScreen extends AppCompatActivity implements Observer {
    private NetworkChangeReceiver networkChangeReceiverSplashScreen = new NetworkChangeReceiver();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.splash_screen);

        AppCompatImageView imageView = findViewById(R.id.splashScreenImageView);

        ObjectAnimator objectAnimator = ObjectAnimator.ofPropertyValuesHolder(imageView,
                PropertyValuesHolder.ofFloat("scaleX", 1.2f),
                PropertyValuesHolder.ofFloat("scaleY", 1.2f));

        objectAnimator.setDuration(500);
        objectAnimator.setRepeatCount(ValueAnimator.INFINITE);
        objectAnimator.setRepeatMode(ValueAnimator.REVERSE);
        objectAnimator.start();

        IntentFilter intentFilter = new IntentFilter(ConnectivityManager.CONNECTIVITY_ACTION);
        ObservableObject.getInstance().addObserver(this);
        registerReceiver(networkChangeReceiverSplashScreen, intentFilter);
    }

    /**
     * Transition from Left to Right
     *
     * @param context
     */
    public void animateSlideLeft(Context context) {
        ((SplashScreen) context).overridePendingTransition(R.anim.animate_slide_left_enter, R.anim.animate_slide_left_exit);
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        ObservableObject.getInstance().deleteObserver(this);
        unregisterReceiver(networkChangeReceiverSplashScreen);
    }

    @Override
    public void update(Observable observable, Object intent) {
        if (null != intent) {
            boolean status = ((Intent) intent).getBooleanExtra("status", Boolean.TRUE);
            Snackbar snackBar = Snackbar.make(findViewById(android.R.id.content), status ? "Connected to internet." : "Check internet connection!!", status ? Snackbar.LENGTH_SHORT : Snackbar.LENGTH_INDEFINITE);
            // get snackbar view
            View mView = snackBar.getView();
            Snackbar.SnackbarLayout layout = (Snackbar.SnackbarLayout) mView;

            layout.setPadding(0, 0, 0, 0);//set padding to 0
            // get textview inside snackbar view
            TextView mTextView = mView.findViewById(com.google.android.material.R.id.snackbar_text);
            // set text to center
            mTextView.setGravity(Gravity.CENTER_HORIZONTAL);
            mTextView.setBackgroundColor(ContextCompat.getColor(SplashScreen.this, status ? R.color.colorGreen : R.color.design_default_color_error));
            // show the snackbar
            snackBar.show();

            if (status) {
                try {
                    Intent mainIntent = new Intent(SplashScreen.this, MainActivity.class);
                    mainIntent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
                    String value = null;
                    SQLiteDatabase readableDatabase = ReactDatabaseSupplier.getInstance(this).getReadableDatabase();

                    boolean isCategoryEmpty = TextUtils.isEmpty(AsyncLocalStorageUtil.getItemImpl(readableDatabase, "@save_category_id")) &&
                            TextUtils.isEmpty(AsyncLocalStorageUtil.getItemImpl(readableDatabase, "@save_category_button_type"));

                    readableDatabase.close();

                    mainIntent.putExtra("navigationRoute", isCategoryEmpty ? "Intro" : "Glance");
                    startActivity(mainIntent);
                    animateSlideLeft(this);
                    finish();
                } catch (Exception exception) {
                    System.out.println(exception);
                }
            }
        }
    }
}
