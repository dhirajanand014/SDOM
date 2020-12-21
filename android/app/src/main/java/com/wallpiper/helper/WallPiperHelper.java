package com.wallpiper.helper;

import android.content.Context;
import android.database.sqlite.SQLiteDatabase;
import android.text.TextUtils;

import com.reactnativecommunity.asyncstorage.AsyncLocalStorageUtil;
import com.reactnativecommunity.asyncstorage.ReactDatabaseSupplier;

public class WallPiperHelper {

    /**
     * Helper to check if category is selected after the initial view.
     *
     * @param context
     * @return
     */
    public static boolean isCategoryEmpty(Context context) {
        SQLiteDatabase readableDatabase = ReactDatabaseSupplier.getInstance(context).getReadableDatabase();

        boolean isCategoryEmpty = TextUtils.isEmpty(AsyncLocalStorageUtil.getItemImpl(readableDatabase, "@save_category_id")) &&
                TextUtils.isEmpty(AsyncLocalStorageUtil.getItemImpl(readableDatabase, "@save_category_button_type"));

        readableDatabase.close();

        return isCategoryEmpty;
    }
}
