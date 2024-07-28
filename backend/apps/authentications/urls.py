from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView, TokenVerifyView
from apps.authentications.authentication import AuthenticationView

# AUTHENTICATION URLS
auth_urls = [
    path(
        "login",
        AuthenticationView.as_view(
            {
                "post": "authenticate"
            }
        ),
        name="login",
    ),
    path(
        "logout",
        # TokenBlacklistView.as_view(),
        AuthenticationView.as_view(
            {
                "post": "logout"
            }
        ),
        name="logout",
    ),
    path(
        "register",
        AuthenticationView.as_view(
            {
                "post": "register"
            }
        ),
        name="register",
    ),
    path(
        'otp/<uuid:pk>',
        AuthenticationView.as_view(
            {
                'get':'send_otp',
                'put':'verify_code'
            }
        ),
        name='otp'
    ),
    path(
        'verify',
        AuthenticationView.as_view(
            {
                'post':'verify_email_or_phone',
            }
        ),
        name='verify_email_or_phone'
    ),
    path(
        'changepass',
        AuthenticationView.as_view(
            {
                'post':'change_password',
                # 'put':'renew_password',
            }
        ),
        name='change_password'
    ),
    path(
        'renew/pass/<uuid:pk>',
        AuthenticationView.as_view(
            {
                'put':'renew_password',
            }
        ),
        name='renew_password'
    ),
    path(
        'SendOtpToPhone/<str:phone>',
        AuthenticationView.as_view(
            {
                'get':'check_phone_and_send_otp',
            }
        ),
        name='check_phone_and_send_otp'
    )
]

# TOKEN URLs
token_urls = [
    path(
        "token/refresh", 
        TokenRefreshView.as_view(), 
        name="token_refresh"
    ),
    path(
        "token/verify", 
        TokenVerifyView.as_view(), 
        name="token_verify"
    ),
]

urlpatterns = auth_urls + token_urls