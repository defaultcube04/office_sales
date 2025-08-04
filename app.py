from flask import Flask, render_template, request, jsonify
from pymongo import MongoClient
from config import MONGO_URI

app = Flask(__name__)

# Connect to MongoDB
client = MongoClient(MONGO_URI)
db = client['office']
office_mapping_collection = db['office_mapping']
product_collection = db['products']
sales_collection = db['sales']

@app.route('/')
def form():
    # Fetch data for dropdowns
    office_names = [doc['office_name'] for doc in office_mapping_collection.find({}, {'_id': 0, 'office_name': 1})]
    brands = list(product_collection.distinct('brand'))
    return render_template('index.html', office_names=office_names, brands=brands)

@app.route('/get_sales_person', methods=['POST'])
def get_sales_person():
    office_name = request.json.get('office_name')
    result = office_mapping_collection.find_one({'office_name': office_name})
    return jsonify({'sales_person': result['sales_person']} if result else {})

@app.route('/get_products', methods=['POST'])
def get_products():
    brand = request.json.get('brand')
    products = [doc['product'] for doc in product_collection.find({'brand': brand}, {'_id': 0, 'product': 1})]
    return jsonify({'products': products})

@app.route('/submit', methods=['POST'])
def submit():
    data = request.json
    sales_collection.insert_one(data)
    return jsonify({'message': 'Data submitted successfully!'})

if __name__ == '__main__':
    app.run(debug=True)
