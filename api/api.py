# coding: utf-8

import json
import utils
import os
import time
import random
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

@app.route('/servers/<file_id>', methods=['GET'])
def get_servers(file_id):

    time.sleep(3); # para simular o tempo de uma requisição

    servers = [
        {
            'server_name': 'server01',
            'hosted': True
        },
        {
            'server_name': 'server02',
            'hosted': False
        },
        {
            'server_name': 'server03',
            'hosted': False
        },
        {
            'server_name': 'server04',
            'hosted': False
        },
        {
            'server_name': 'server05',
            'hosted': True
        },
        {
            'server_name': 'server06',
            'hosted': False
        },
        {
            'server_name': 'server07',
            'hosted': False
        },
        {
            'server_name': file_id,
            'hosted': True
        },                                                        
    ]

    return jsonify(servers)

@app.route('/migrate',  methods=['PUT'])
def migrate():

    if not request.json:
        abort(400)

    file_id = request.json.get('fileId')
    target_server = request.json.get('targetServer')
    
    time.sleep(3); # para simular o tempo de uma requisição

    return jsonify(['simulando success caso algo precise ser retornado']) 

@app.route('/checksum',  methods=['GET'])
def checksum(file_id):
    
    time.sleep(3); # para simular o tempo de uma requisição
    checksum = random.randint(100000000, 300000000)

    return jsonify({
        'checksum': checksum
    }) 

if __name__ == "__main__":
    port = int(os.environ.get('PORT', 3000))
    app.debug = True
    app.run(host='127.0.0.1', port=port)
    app.run()