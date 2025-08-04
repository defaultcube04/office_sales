<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Apollo Peripherals Sales Data</title>
    <link rel="stylesheet" href="{{ url_for('static', filename='styles.css') }}">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
</head>
<body>
    <div class="container">
        <h1>Apollo Peripherals Sales Data</h1>
        <form id="sales-form">

            <!-- ✅ Date Field -->
            <label for="date">Date:</label>
            <input type="date" id="date" name="date" required>

            <label for="office_name">Office Name:</label>
            <input type="text" id="office_name" name="office_name" list="officeList" required>
            <datalist id="officeList">
                {% for name in office_names %}
                <option value="{{ name }}">
                {% endfor %}
            </datalist>

            <label for="sales_person">Sales Person:</label>
            <input type="text" id="sales_person" name="sales_person" readonly>

            <label for="brand">Brand:</label>
            <select id="brand" name="brand" required>
                <option value="">Select Brand</option>
                {% for brand in brands %}
                <option value="{{ brand }}">{{ brand }}</option>
                {% endfor %}
            </select>

            <label for="product">Product:</label>
            <select id="product" name="product" required>
                <option value="">Select Product</option>
            </select>

            <label for="quantity">Quantity:</label>
            <input type="number" id="quantity" name="quantity" required>

            <label for="amount">Amount:</label>
            <input type="number" id="amount" name="amount" required>

            <button type="submit">Submit</button>
        </form>
    </div>

    <script src="{{ url_for('static', filename='script.js') }}"></script>
</body>
</html>
