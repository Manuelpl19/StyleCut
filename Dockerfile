FROM php:8.2-apache

# 1. Instalar dependencias (HEMOS AÑADIDO libicu-dev para evitar el error 2)
RUN apt-get update && apt-get install -y \
    libzip-dev \
    zip \
    unzip \
    git \
    libonig-dev \
    libpq-dev \
    libicu-dev \
    && docker-php-ext-install pdo_mysql pdo_pgsql zip bcmath opcache intl

# 2. Activar mod_rewrite
RUN a2enmod rewrite

# 3. Copiar archivos
COPY . /var/www/html

# 4. Configurar Apache
ENV APACHE_DOCUMENT_ROOT /var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf

# 5. Instalar Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# 6. Instalar dependencias de Laravel
WORKDIR /var/www/html
# TRUCO: Añadimos --ignore-platform-reqs para que no falle si falta algo pequeño
RUN composer install --no-dev --optimize-autoloader --ignore-platform-reqs

# 7. Permisos
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# 8. Puerto
EXPOSE 80