FROM php:8.0-cli-alpine
RUN apk add --no-cache \
    supervisor \
    file gettext icu-dev postgresql-dev libzip-dev \
    && docker-php-ext-install -j$(nproc) intl pdo_pgsql zip

COPY infrastructure/workers/php.ini /usr/local/etc/php/php.ini
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
ENV COMPOSER_ALLOW_SUPERUSER=1
ENV PATH="${PATH}:/root/.composer/vendor/bin"

WORKDIR /var/www/html
# WORKDIR /app

CMD ["supervisord", "--nodaemon", "--configuration", "infrastructure/workers/supervisord.conf"]
