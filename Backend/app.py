from flask import Flask, jsonify
import threading
from scraper import find_utah_jobs, find_linkedin_utah_jobs, find_linkedin_usa_jobs
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

jobs_data = {
    'utahJobs': [],
    'linkedinUtahJobs': [],
    'linkedinUSAJobs': [],
    'utahJobsUpdated': False,
    'linkedinUtahJobsUpdated': False,
    'linkedinUSAJobsUpdated': False,
}

def update_utah_jobs():
    try:
        jobs_data['utahJobs'] = find_utah_jobs()
        jobs_data['utahJobsUpdated'] = True
    except Exception as e:
        jobs_data['utahJobs'] = []
        jobs_data['utahJobsUpdated'] = False
        print(f"Error updating jobs: {e}")

def update_linkedin_utah_jobs():
    try:
        jobs_data['linkedinUtahJobs'] = find_linkedin_utah_jobs()
        jobs_data['linkedinUtahJobsUpdated'] = True
    except Exception as e:
        jobs_data['linkedinUtahJobs'] = []
        jobs_data['linkedinUtahJobsUpdated'] = False
        print(f"Error updating jobs: {e}")

def update_linkedin_usa_jobs():
    try:
        jobs_data['linkedinUSAJobs'] = find_linkedin_usa_jobs()
        jobs_data['linkedinUSAJobsUpdated'] = True
    except Exception as e:
        jobs_data['linkedinUSAJobs'] = []
        jobs_data['linkedinUSAJobsUpdated'] = False
        print(f"Error updating jobs: {e}")

@app.route('/search-utah-jobs', methods=['GET'])
def search_utah_jobs():
    if not jobs_data['utahJobsUpdated']:
        thread = threading.Thread(target=update_utah_jobs)
        thread.start()
        thread.join()
    return jsonify(jobs_data['utahJobs']), 200

@app.route('/search-linkedin-utah-jobs', methods=['GET'])
def search_linkedin_utah_jobs():
    if not jobs_data['linkedinUtahJobsUpdated']:
        thread = threading.Thread(target=update_linkedin_utah_jobs)
        thread.start()
        thread.join()
    return jsonify(jobs_data['linkedinUtahJobs']), 200

@app.route('/search-linkedin-usa-jobs', methods=['GET'])
def search_linkedin_usa_jobs():
    if not jobs_data['linkedinUSAJobsUpdated']:
        thread = threading.Thread(target=update_linkedin_usa_jobs)
        thread.start()
        thread.join()
    return jsonify(jobs_data['linkedinUSAJobs']), 200

if __name__ == '__main__':
    app.run(debug=True, port=5000)
