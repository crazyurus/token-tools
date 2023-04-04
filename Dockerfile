FROM php:7.4-apache

RUN docker-php-ext-install mysqli pdo pdo_mysql

COPY . /var/www/html/

RUN echo "ServerName 0.0.0.0" >> $APACHE_CONFDIR/apache2.conf
RUN a2enmod rewrite
RUN service apache2 restart
