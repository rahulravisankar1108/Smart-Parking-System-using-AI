from flask import Flask
import sys

sys.path.insert(0, 'D:\\Documents\\8th sem\\Final year project\\Smart_Parking_system\\Detection')
# sys.path.insert(0, '/Smart_Parking_system/Detection')

from plate_recognition import vehiclePlateDetection

app = Flask(__name__)

@app.route("/flask/api/v1/detect-images", methods=['GET'])
def detectNumberPlate():
    detectedNumberPlate = vehiclePlateDetection()
    # detectedNumberPlate = 'TN 38 AL 1234'
    return detectedNumberPlate


if __name__ == "__main__":
    app.run(port=5000, debug=True)
