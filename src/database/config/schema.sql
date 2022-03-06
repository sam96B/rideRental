CREATE TABLE "users"(
    "id" INTEGER NOT NULL,
    "role_id" INTEGER NOT NULL,
    "email" VARCHAR(255) NULL,
    "username" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "photo" VARCHAR(255) NULL,
    "address" VARCHAR(255) NULL,
    "total_payment" INTEGER NOT NULL,
    "discount" INTEGER NOT NULL
);
ALTER TABLE
    "users" ADD PRIMARY KEY("id");
CREATE TABLE "roles"(
    "id" INTEGER NOT NULL,
    "type" INTEGER NOT NULL
);
ALTER TABLE
    "roles" ADD PRIMARY KEY("id");
CREATE TABLE "vehicles"(
    "id" INTEGER NOT NULL,
    "type_id" INTEGER NOT NULL,
    "brand_id" INTEGER NOT NULL,
    "model_year" INTEGER NOT NULL,
    "capacity" INTEGER NOT NULL,
    "photo" VARCHAR(255) NOT NULL

);
ALTER TABLE
    "vehicles" ADD PRIMARY KEY("id");
CREATE TABLE "vehicle_types"(
    "id" INTEGER NOT NULL,
    "type" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "vehicle_types" ADD PRIMARY KEY("id");
CREATE TABLE "brands"(
    "id" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "brands" ADD PRIMARY KEY("id");
CREATE TABLE "transactions"(
    "id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "status" VARCHAR(255) NOT NULL,
    "start_date" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
    "end_date" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL
);
ALTER TABLE
    "transactions" ADD PRIMARY KEY("id");
CREATE TABLE "user_reports"(
    "id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "message" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "user_reports" ADD PRIMARY KEY("id");

CREATE TABLE "vehicle_code"(
    "id" INTEGER NOT NULL,
    "vehicle_id" INTEGER NOT NULL,
    "code" VARCHAR(255) NOT NULL,
    "status" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "vehicle_code" ADD PRIMARY KEY("id");
CREATE TABLE "vec_tran"(
    "vec_id" INTEGER NOT NULL,
    "tran_id" INTEGER NOT NULL
);
ALTER TABLE
    "vec_tran" ADD PRIMARY KEY("vec_id");
ALTER TABLE
    "vec_tran" ADD PRIMARY KEY("tran_id");
ALTER TABLE
    "users" ADD CONSTRAINT "users_role_id_foreign" FOREIGN KEY("role_id") REFERENCES "roles"("id");
ALTER TABLE
    "vehicles" ADD CONSTRAINT "vehicles_type_id_foreign" FOREIGN KEY("type_id") REFERENCES "vehicle_types"("id");
ALTER TABLE
    "vehicles" ADD CONSTRAINT "vehicles_brand_id_foreign" FOREIGN KEY("brand_id") REFERENCES "brands"("id");
ALTER TABLE
    "transactions" ADD CONSTRAINT "transactions_user_id_foreign" FOREIGN KEY("user_id") REFERENCES "users"("id");
ALTER TABLE
    "user_reports" ADD CONSTRAINT "user_reports_user_id_foreign" FOREIGN KEY("user_id") REFERENCES "users"("id");