const root = process.env.NODE_ENV === 'prod' ? 'https://awsbalch.com/' : '/';

export const WEB_RTC_TOKEN = root + 'video/token';