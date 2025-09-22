from pydantic import PostgresDsn, computed_field
from pydantic_core import MultiHostUrl
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    ENVIRONMENT: str = "development"

    model_config = SettingsConfigDict(
        env_file="../.env." + ENVIRONMENT,
        env_ignore_empty=True,
        extra="ignore",
    )

    PG_USER: str = "postgres"
    PG_PASSWORD: str = "postgres"
    PG_HOST: str = "localhost"
    PG_PORT: int = 5432
    PG_DATABASE: str = "digimon-digital-card-battle-guide"

    @computed_field
    @property
    def SQLALCHEMY_DATABASE_URI(self) -> PostgresDsn:
        return MultiHostUrl.build(
            scheme="postgresql+psycopg",
            username=self.PG_USER,
            password=self.PG_PASSWORD,
            host=self.PG_HOST,
            port=self.PG_PORT,
            path=self.PG_DATABASE,
        )


settings = Settings()
