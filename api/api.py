# coding: utf-8

import json
import utils
import os
from flask import Flask, jsonify, request

app = Flask(__name__)

# Routes --------------------------------------------------------------

@app.route('/list_dir/<path:path>', methods=['GET'])
def list_dir(path):
    
    path = "/" + path

    print(path)

    files = []    
    for file in os.listdir(path):
        
        if file[0] == '.':
            continue

        m_path = os.path.join(path, file)
        is_dir = os.path.isdir(m_path)
        mdict = {
            'is_dir': is_dir,
            'path': m_path,
            'name': file
        }
        files.append(mdict)

    return jsonify(files)

@app.route('/list_dir/home', methods=['GET'])
def list_home():    
    return list_dir(utils.HOME_USER[1:])


if __name__ == "__main__":
    port = int(os.environ.get('PORT', 3000))
    app.debug = True
    app.run(host='127.0.0.1', port=port)
    app.run()