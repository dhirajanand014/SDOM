package com.wallpiper.enums;

/**
 * Notification type Enum
 */
public enum NotificationType {
    NEW_POST("PN001");

    private String notificationType;

    private NotificationType(String notificationType) {
        this.notificationType = notificationType;
    }

    public String getNotificationType() {
        return notificationType;
    }

    public void setNotificationType(String notificationType) {
        this.notificationType = notificationType;
    }
}
