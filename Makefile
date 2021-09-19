#Задаем подкоманды для изменения цвета
export red=`tput setaf 1`
export green=`tput setaf 2`
export yellow=`tput setaf 3`
export blue=`tput setaf 4`
export magenta=`tput setaf 5`
export cyan=`tput setaf 6`
export white=`tput setaf 7`
export reset=`tput sgr0`

PROJECT_NAME = upakovali_online
PHP_CONTAINER_NAME = ${PROJECT_NAME}_php_1
DB_CONTAINER_NAME = ${PROJECT_NAME}_postgres_1

about:
	@echo -e "${cyan}Привет!)${reset} Это мэйкфайл для удобной работы с командами ${cyan};)${reset}  \
	 \n Выполняйте нужные действия с помощью ${yellow}make имякоманды${reset}, доступные команды: \
	 \n ${green}down${reset} - Остановить и удалить контейнеры \
	 \n ${green}migrate${reset} - применит миграции \
	 \n ${green}up${reset} - Запустит все контейнеры приложения (соберет образы, если их нет) \
	 \n ${green}stop${reset} - Остановит все контейнеры приложения \
	 \n ${green}restart${reset} - Остановит все контейнеры приложения и запустит их заново \
	 \n ${green}rebuild${reset} - Остановит все контейнеры приложения, пересоберет их запустит их заново \
	"

up:
	docker-compose up -d
	@make -s app.show_local_urls

down:
	docker-compose down

stop:
	docker-compose stop

restart:
	stop up

rebuild:
	docker-compose up -d --build
	@make -s app.show_local_urls

migrate:
	@echo  "Выполняем ${yellow}миграции${reset}..."
	docker exec -it $(PHP_CONTAINER_NAME) bash -c "php artisan migrate"

migrate.fresh:
	@echo  "Выполняем ${yellow}миграции${reset}..."
	docker exec -it $(PHP_CONTAINER_NAME) bash -c "php artisan migrate:fresh --seed"

docs:
	@echo  "Обновленяем файл манифеста документации для ${yellow}swagger${reset}..."
	docker exec -it $(PHP_CONTAINER_NAME) bash -c "php artisan l5-swagger:generate"

app.show_local_urls:
	@echo  "Локальное приложение ${cyan}upakovali online${reset}: http://localhost:29080"
	@echo  "Локальный ${cyan}Swagger${reset}: http://localhost:29123"

db.shell:
	docker exec -it $(DB_CONTAINER_NAME) bash

db.query:
	docker exec -it $(DB_CONTAINER_NAME) bash -c "psql --user upakovali_online_user --password upakovali_online_db"
