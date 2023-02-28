## RecipeBuddy Frontend JS Basics
## By Juno Meifert - 2/28/2023
Open in VScode or Github for the best experience.

# Section 1 - Getting and Displaying Data

## Displaying content on the page
It's pretty simple to display something on the page. Just give it a placeholder with a unique ID, and set it later in the script. This will be done when the page loads.
```html
<div id="greeting"></div>

<script>
    document.getElementByID("greeting").innerHTML = "<p>Hello!</p>";
</script>
```
The result should look like the following:
>Hello!

## Formatting HTML and displaying it
Normally, we want to format the content we're displaying. This is the easiest way to do it.
```html
<div id="greeting"></div>

<script>
    var name = "joe";
    var formatted_result = `
        <p>Hello, ${name}!</p>
    `

    document.getElementByID("Greeting").innerHTML = formatted_result;
</script>
```
The result should look like the following:
>Hello, joe!

## Getting data from an API
The below code gets data from an API and displays it. Fetching is always asynchronous so you need to have your get function call your display function. (It will do this when the request is finished)

Suppose api/greeting.txt returns the following:
```
Hello, world!
```
The following code will fetch this and display it.
```html
<div id="greeting"></div>
<script>
    function display(data) {
        document.getElementByID("greeting").innerHTML = data;
    }

    async function get_and_display(url) {
        response = await fetch(url, {
            method: "GET",
            mode: "no-cors",
            headers: {
                "Accept": "text/plain",
            },
        });

        var data = await response.text();
        display(data);
    }

    get_and_display("api/greeting.txt");

</script>
```
The result should look like the following:
>Hello, world!

## The whole thing - Getting JSON, parsing, and displaying.
First, you get the data from the API, which is in JSON form. This integrates very nicely with Javascript.

Assume the call "api/user/1" returns the following JSON:
```json
{
    "user": {
        "name": "joe",
        "desc": "mama",
    }
}
```
The following code will greet the user by their name.
```html
<div id="greeting"></div>

<script>
    function display_hello(txt) {
        formatted_result = `
        Hello, ${txt}!
        `
        document.getElementByID("greeting").innerHTML = formatted_result;
    }

    async function get_and_display(url) {
        response = await fetch(url, {
            method: "GET",
            mode: "no-cors",
            headers: {
                "Accept": "application/json",
            },
        });

        var data = await response.json();
        display_hello(data.user.name);
    }

    get_and_display("api/user/1");

</script>
```
The result should look like the following:
>Hello, joe!

## Practical Example
Suppose the recipe AI returns this when api/recipes/1 is called.
```json
{
    "recipe": {
        "name": "The Collins Burrito",
        "desc": "A tasty meal!",
        "rating": 3.1,
    }
}
```
To display it nicely, we'll do the following:
```html
<div id="recipe"></div>

<script>
    function display_recipe(recipe) {
        formatted_result = `
        <div class="recipe_name">${recipe.name}</div>
        <div class="recipe_desc">${recipe.desc}</div>
        <div class="recipe_rating>${recipe.rating}</div>
        `
        document.getElementByID("recipe").innerHTML = formatted_result;
    }

    async function get_and_display(url) {
        response = await fetch(url, {
            method: "GET",
            mode: "no-cors",
            headers: {
                "Accept": "application/json",
            },
        });

        var data = await response.json();
        display_recipe(data.recipe);
    }

    get_and_display("api/recipes/1");

</script>
```
This lets us use CSS to format how the recipe will be displayed.

# Section 2 - Sending Data to the API
Forms are the easiest way to collect data from the user.
```html
<input id="name_box">
<button type="button" onclick="handleSubmit()">Submit</button>
<div id="greeting"></div>

<script>
    function handleSubmit() {
        var name = document.getElementById("name_box").value;
        var result;
        if(name === "joe") {
            result = "<p>joe mama</p>";
        } else {
            result = `
            <p>Hello, ${name}</p>
            `
        }
        document.getElementById("greeting").innerHTML = result;
    }
</script>
```
Depending on what you type in, you may get a pleasant greeting or a "joe mama". This is a simple example of collecting and sanitizing strings.