import os

assets_dir = r"c:\Users\Welcome\Documents\Yogees\YogeesWebsite\assets"

mapping = {
    "WhatsApp Image 2026-03-29 at 11.18.35 AM.jpeg": "muthuramman.jpg",
    "WhatsApp Image 2026-03-29 at 11.18.36 AM (1).jpeg": "hero.jpg",
    "WhatsApp Image 2026-03-29 at 11.18.37 AM (2).jpeg": "qr.jpg",
    "WhatsApp Image 2026-03-29 at 11.18.36 AM.jpeg": "history1.jpg",
    "WhatsApp Image 2026-03-29 at 11.18.37 AM (1).jpeg": "history2.jpg",
    "WhatsApp Image 2026-03-29 at 11.18.37 AM.jpeg": "festivals.jpg"
}

for old_name, new_name in mapping.items():
    old_path = os.path.join(assets_dir, old_name)
    new_path = os.path.join(assets_dir, new_name)
    if os.path.exists(old_path):
        try:
            os.rename(old_path, new_path)
            print(f"Renamed: {old_name} -> {new_name}")
        except Exception as e:
            print(f"Error renaming {old_name}: {e}")
    else:
        print(f"File not found: {old_name}")
