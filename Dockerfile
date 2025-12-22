# =========================
# STAGE 1: BUILD FRONTEND
# =========================
FROM node:22 AS node_builder

# install php + required extensions + composer
RUN apt-get update && apt-get install -y \
    php-cli php-xml unzip curl git \
    && curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

WORKDIR /app

# install PHP deps (vendor/)
COPY composer.json composer.lock ./
RUN composer install --no-dev --prefer-dist --no-interaction

# copy rest
COPY . .

# frontend build
RUN npm install
RUN npm run build




# =========================
# STAGE 2: PHP + APACHE
# =========================
FROM php:8.2-apache

RUN apt-get update && apt-get install -y \
    zip unzip git curl sqlite3 libsqlite3-dev libzip-dev \
    && docker-php-ext-install pdo pdo_sqlite zip

RUN a2enmod rewrite
WORKDIR /var/www/html

COPY . .
COPY --from=node_builder /app/public/build /var/www/html/public/build

ENV APACHE_DOCUMENT_ROOT=/var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' \
    /etc/apache2/sites-available/*.conf \
    /etc/apache2/apache2.conf

RUN chown -R www-data:www-data storage bootstrap/cache database
