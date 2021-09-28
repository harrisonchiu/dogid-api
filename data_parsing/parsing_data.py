import base64
import imghdr
import io

import requests
import matplotlib as mpl


status_api_url = "https://dogid-api.herokuapp.com/api/"
images_api_url = "https://dogid-api.herokuapp.com/api/breed-images/"

api_status = requests.get(url=status_api_url)
is_api_online = (api_status.json()["status"] == "API is running...")


if is_api_online:
    parsed_images = []
    database_images = requests.get(url=images_api_url).json()

    # Parse resources from database to only show images
    for image in database_images:
        image_bytes = base64.b64decode(image["image_base64"])
        image_extension = imghdr.what(None, h=image_bytes)

        if image_extension not in {"jpeg", "png"}:
            request = requests.delete(images_api_url + image["id"])
        else:
            parsed_images.append({
                "label": image["label"],
                "image_bytes": image_bytes
            })

    # Show the images to manually parse
    # Viewer will determine if image label is correct
    # or if the image is sufficiently good enough to help train model
    for image in parsed_images:
        data = image["image_bytes"]
        data = io.BytesIO(data)
        data = mpl.image.imread(data, format='JPG')

        mpl.pyplot.imshow(data, interpolation="nearest")
        mpl.pyplot.title(image["label"])
        mpl.pytplot.show()

        user_decision = input("Save? (Y/N)> ").lower()

        if user_decision in {"y", "yes"}:
            print("Saving data to file")
            with open("image_data.txt", "a") as f:
                f.write(str(image) + "\n")
        else:
            print("Did not save data to file")

    print("Check image_data.txt to see all accepted images")

else:
    print("API is not up right now")