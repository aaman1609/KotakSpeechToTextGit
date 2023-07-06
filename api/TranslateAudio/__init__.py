import logging

import azure.functions as func
import speech_recognition as sr
from os import path
import json

def main(req: func.HttpRequest) -> func.HttpResponse:
    try :
    
        logging.info('Python HTTP trigger function processed a request.')

        AUDIO_FILE = path.join(path.dirname(path.realpath(__file__)), "file.wav")
        with open(AUDIO_FILE, "wb") as vid:
            video_stream = req.files['audio-file'].read()
            vid.write(video_stream)

        # use the audio file as the audio source
        r = sr.Recognizer()
        with sr.AudioFile(AUDIO_FILE) as source:
            audio = r.record(source)  # read the entire audio file
    
        sphinx =""
        logging.info('trying sphinx')
        # recognize speech using Sphinx
        try:
            sphinx = ("Sphinx(local  + Free) thinks you said " + r.recognize_sphinx(audio))
            logging.info(sphinx)
        except sr.UnknownValueError:
            sphinx = ("Sphinx could not understand audio")
        except sr.RequestError as e:
            sphinx = ("Sphinx error; {0}".format(e))
        except Exception as  e:
             sphinx = ("Some other error occoured {0}".format(e))


        gsr = ""
        # recognize speech using Google Speech Recognition
        try:
            # for testing purposes, we're just using the default API key
            # to use another API key, use `r.recognize_google(audio, key="GOOGLE_SPEECH_RECOGNITION_API_KEY")`
            # instead of `r.recognize_google(audio)`
            gsr = ("Google Speech Recognition(Internet + Free) thinks you said " + r.recognize_google(audio))
            logging.info(gsr)
        except sr.UnknownValueError:
            gsr = ("Google Speech Recognition could not understand audio")
        except sr.RequestError as e:
            gsr = ("Could not request results from Google Speech Recognition service; {0}".format(e))
        except Exception as  e:
             gsr = ("Some other error occoured {0}".format(e))

        gcs = ""
        # recognize speech using Google Cloud Speech
        GOOGLE_CLOUD_SPEECH_CREDENTIALS = r"""react-password-mngr-966eaa923db7.json"""
        try:
            gcs = ("Google Cloud Speech(Internet + Paid) thinks you said " + r.recognize_google_cloud(audio, credentials_json=GOOGLE_CLOUD_SPEECH_CREDENTIALS))
            logging.info(gcs)
        except sr.UnknownValueError:
            gcs = ("Google Cloud Speech could not understand audio")
        except sr.RequestError as e:
            gcs = ("Could not request results from Google Cloud Speech service; {0}".format(e))
        except Exception as  e:
             gcs = ("Some other error occoured {0}".format(e))

        

        whisper =""
        # recognize speech using whisper
        try:
            whisper =("Whisper by OpenAI(local + Free) thinks you said " + r.recognize_whisper(audio, language="english"))
            logging.info(whisper)
        except sr.UnknownValueError:
            whisper =("Whisper by OpenAI could not understand audio")
        except sr.RequestError as e:
            whisper =("Could not request results from Whisper")
        except Exception as  e:
             whisper = ("Some other error occoured {0}".format(e))

        logging.info(sphinx)
        logging.info(gsr)
        logging.info(gcs)
        logging.info(whisper)
    
        abc = { "sphinx" :sphinx,
           "gsr" :gsr,
           "gcs" :gcs,
           "whisper" :whisper,
           "status_code": "200",
           "error_message": "Success"}
        logging.info(abc)
        return func.HttpResponse(json.dumps(abc))
    except Exception as e:
        abc = { "error_message" :"Some error occured",
           "status_code" :500}
        logging.info(abc)
        logging.info(e)
        logging.info("Some error occured")
        return func.HttpResponse(json.dumps(abc))
        
