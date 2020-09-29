package com.sdom.email;

import android.os.AsyncTask;

import com.facebook.react.bridge.ReactApplicationContext;

import java.lang.ref.WeakReference;

public class AsyncSendMail extends AsyncTask<String, Void, String> {

    private WeakReference<ReactApplicationContext> mContext;

    public AsyncSendMail(ReactApplicationContext reactApplicationContext) {
        this.mContext = new WeakReference<>(reactApplicationContext);
    }

    @Override
    protected void onPreExecute() {
        super.onPreExecute();

    }

    @Override
    protected String doInBackground(String... inParameters) {
        return null;
    }

    @Override
    protected void onPostExecute(String s) {
        super.onPostExecute(s);
    }
}
