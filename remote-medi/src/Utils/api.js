const root = process.env.NODE_ENV === 'prod' ? 'https://awsbalch.com/' : 'http://127.0.0.1:8000/';

export const WEB_RTC_TOKEN = root + 'video/token';