FROM postgres:13.4

COPY ./sql/*.sql /docker-entrypoint-initdb.d/

ENTRYPOINT ["/entrypoint.sh"]
