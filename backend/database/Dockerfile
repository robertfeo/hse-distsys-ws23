FROM postgres:alpine3.18

ENV POSTGRES_USER robert
ENV POSTGRES_PASSWORD securepassword
ENV POSTGRES_DB todolist

EXPOSE 5432

COPY schema.sql /docker-entrypoint-initdb.d/
COPY dummydata.sql /docker-entrypoint-initdb.d/

CMD ["postgres"]