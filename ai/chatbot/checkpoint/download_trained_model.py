import pathlib
from google_drive_downloader import GoogleDriveDownloader as gdd

if __name__ == "__main__":
    
    root_path = str(pathlib.Path(__file__).parent.absolute())

    kogpt2_file_id = '1jcVcLnnV2jL-j0gGKishdwfZywqg8R80'
    koelectra_file_id = '1tMhB3mL-Y1KlRL4LZzdgNpIKeiLU-eG_'

    kogpt2_destination = root_path + '/kogpt2-wellness-auto-regressive.pth'
    koelectra_destination = root_path + '/koelectra-wellness-text-classification.pth'

    kogpt2_url = 'https://drive.google.com/file/d/1jcVcLnnV2jL-j0gGKishdwfZywqg8R80/uc?export=download'
    koelectra_url = 'https://drive.google.com/file/d/1tMhB3mL-Y1KlRL4LZzdgNpIKeiLU-eG_/uc?export=download'
    
    gdd.download_file_from_google_drive(file_id=kogpt2_file_id, dest_path=kogpt2_destination, showsize=True)
    gdd.download_file_from_google_drive(file_id=koelectra_file_id, dest_path=koelectra_destination, showsize=True)