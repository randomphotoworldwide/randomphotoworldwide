# TODO: TRASH CHANGE TO PROPER

from minio import Minio
from app.config import settings

class StorageService:
    def __init__(self):
        # De gecentraliseerde initialisatie van de client (Singleton instance)
        self.client = Minio(
            endpoint=settings.SCW_ENDPOINT,
            access_key=settings.SCW_ACCESS_KEY,
            secret_key=settings.SCW_SECRET_KEY,
            secure=settings.SCW_SECURE
        )
        self.bucket_name = settings.SCW_BUCKET_NAME

    def ensure_bucket_exists(self) -> None:
        """Eenmalig aanroepen tijdens app-startup om de bucket te verifiëren."""
        if not self.client.bucket_exists(self.bucket_name):
            # Let op: Bij Scaleway Object Storage (One Zone) is het vaak verstandiger
            # de bucket handmatig via het dashboard aan te maken i.v.m. regio-definities.
            self.client.make_bucket(self.bucket_name)

    def upload_file_stream(self, object_name: str, data, length: int, content_type: str):
        """Streaming upload wrapper voor put_object (industriestandaard)."""
        return self.client.put_object(
            bucket_name=self.bucket_name,
            object_name=object_name,
            data=data,
            length=length,
            part_size=5 * 1024 * 1024 if length == -1 else 0, # 5MB chunks for unknown length/size
            content_type=content_type
        )

# Dit is de Singleton provider via FastAPI's Dependency Injection
def get_storage_service() -> StorageService:
    return StorageService()
