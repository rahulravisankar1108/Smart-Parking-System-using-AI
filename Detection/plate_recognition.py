#!/usr/bin/env python
from __future__ import absolute_import, division, print_function

import json
import time
from collections import OrderedDict
from glob import glob
import cv2
import requests
import random
import sys

sys.path.insert(0, "D:\\Documents\\8th sem\\Final year project\\Smart_Parking_system\\Detection\\capture_images")

def vehiclePlateDetection():
    #regions = 'fr'
    result = []

    cam = cv2.VideoCapture(0)

    img_counter = random.randint(0,10000)

    while True:
        ret, frame = cam.read()
        if not ret:
            print("failed to grab frame")
            break
        cv2.imshow('Capturing', frame)
        time.sleep(3)
        k = cv2.waitKey(1)

        if k%256 == 27:
            # ESC pressed
            # print("Escape hit, closing...")
            break
        elif k%256 == 32:
            # SPACE pressed
            img_name = "vehicle_image_{}.jpeg".format(img_counter)
            cv2.imwrite("Detection/capture_images/"+img_name, frame)
            # print("{} written!".format(img_name))
            cv2.waitKey(3)
            time.sleep(5)

    cam.release()

    cv2.destroyAllWindows()

    # path = 'D:\\Documents\\8th sem\\Final year project\\Smart_Parking_system\\Detection\\capture_images\\'+img_name
    path = 'D:\\Documents\\8th sem\\Final year project\\Smart_Parking_system\\Detection\\capture_images\\vehicle_image_3151.jpeg'
    # path=r'D:\\Documents\\8th sem\\ALPR_INDIAN\\ANPR-Automatic-Number-Plate-Recognition-System-for-Indian-conditions\\vehcle.jpg'
    # path = 'ANPR-Automatic-Number-Plate-Recognition-System-for-Indian-conditions\\test_images\\t11.jpeg'
    with open(path, 'rb') as fp:
        response = requests.post(
                        'https://api.platerecognizer.com/v1/plate-reader/',
                        files=dict(upload=fp),
                        data=dict(regions='fr'),
                        headers={'Authorization': 'Token ' + '46569c6bbf83ec3257068d20a74113e420598687'})
    result.append(response.json(object_pairs_hook=OrderedDict))
    time.sleep(1)
    im=cv2.imread(path)
          
    resp_dict = json.loads(json.dumps(result, indent=2))
    numberPlate=resp_dict[0]['results'][0]['plate']
    boxs=resp_dict[0]['results'][0]['box']
    xmins,ymins,ymaxs,xmaxs=boxs['xmin'],boxs['ymin'],boxs['ymax'],boxs['xmax']
   
    # cv2.imshow("image",im)
    # cv2.waitKey(0)
    # img = cv2.imread(path,cv2.IMREAD_GRAYSCALE)
    # cv2.imshow("Gray Image",img)
    # cv2.waitKey(0)
    # edges = cv2.Canny(img,100,200)
    # cv2.imshow("Edge Image",edges)
    # cv2.waitKey(0)
    # cv2.rectangle(im, (xmins, ymins), (xmaxs, ymaxs), (255,0,0), 2)
    # cv2.rectangle(edges, (xmins, ymins), (xmaxs, ymaxs), (255,0,0), 2)
    # cv2.imshow("Box Edges",edges)
    # cv2.waitKey(0)
    # cv2.imshow("Box On Original",im)
    # cv2.waitKey(0)
    # font = cv2.FONT_HERSHEY_SIMPLEX
    # cv2.putText(im,num,(xmins, ymins-10), font, 1,(255,0,0),2,cv2.LINE_AA)
    # cv2.imshow("Number",im)
    # cv2.waitKey(0)
    # cv2.destroyAllWindows()
    print(f"the car number is {numberPlate}")
    return numberPlate

    
if __name__ == '__main__':
    vehiclePlateDetection()
