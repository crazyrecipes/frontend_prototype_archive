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
    `;

    document.getElementByID("Greeting").innerHTML = formatted_result;
</script>
```
The result should look like the following:
>Hello, joe!

## Getting data from an API
The below code gets data from an API and displays it. Fetching is always asynchronous so you need to have your call to display the result in the async part.

Suppose api/greeting.txt returns the following:
```
Hello, world!
```
The following code will fetch this and display it.
```html
<div id="greeting"></div>
<script>
    function greet(url) {
        fetch(url, {
            method: "GET",
            headers: {
                "Accept": "text/plain",
            },
        }).then(async response => {
            const data = await response.text();
            formatted_result = `
            Hello, ${data}!
            `;
            document.getElementByID("greeting").innerHTML = formatted_result;
        }).catch(error => {
            document.getElementByID("greeting").innerHTML = "Error!";
        });
    }
    greet("api/greeting.txt");

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
    function greet(url) {
        fetch(url, {
            method: "GET",
            headers: {
                "Accept": "application/json",
            },
        }).then(async response => {
            const data = await response.json();
            formatted_result = `
            Hello, ${data.user.name}!
            `
            document.getElementByID("greeting").innerHTML = formatted_result;
        }).catch(error => {
            document.getElementByID("greeting").innerHTML = "Error!";
        });
    }
    greet("api/user/1");

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
    function disp_recipe(url) {
        fetch(url, {
            method: "GET",
            headers: {
                "Accept": "application/json",
            },
        }).then(async response => {
            const data = await response.json();
            formatted_result = `
            <div class="recipe_name">${recipe.name}</div>
            <div class="recipe_desc">${recipe.desc}</div>
            <div class="recipe_rating>${recipe.rating}</div>
            `
            document.getElementByID("recipe").innerHTML = formatted_result;
        }).catch(error => {
            document.getElementByID("recipe").innerHTML = "Error!";
        });
    }

    disp_recipe("api/recipes/1");

</script>
```
This lets us use CSS to format how the recipe will be displayed.

# Section 2 - Sending Data to the API
## Forms
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
            `;
        }
        document.getElementById("greeting").innerHTML = result;
    }
</script>
```
Depending on what you type in, you may get a pleasant greeting or a "joe mama". This is a simple example of collecting and sanitizing strings.

## Sending data
Sending data to the server can be done in the submit handler. It can then refresh the page to show changes (optional)
```html
<input id="name_box">
<button type="button" onclick="handleSubmit()">Submit</button>
<div id="greeting"></div>

<script>
    function handleSubmit() {
        var name = document.getElementById("name_box").value;

        fetch("api/users/1/name", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: name,
        }).then(async response => {
            const data = await response.text();
            if(response.ok) {
                document.getElementByID("greeting").innerHTML = "Success!";
            } else {
                document.getElementByID("greeting").innerHTML = "Bad response!";
            }
        }).catch(error => {
            document.getElementByID("greeting").innerHTML = "Error!";
        });
        document.getElementById("greeting").innerHTML = result;
    }
</script>
```

# Storing data
All states in the frontend should be stored as URL-encoded or local data.

## Getting parameters from the URL
Getting a parameter from the URL is pretty easy.
```html
<script>
    const params = new URLSearchParams(decodeURI(window.location.search));
    console.log(params.get("searchQuery"))
</script>
```

## Storing a parameter in the URL
The same goes for storing one.
```html
<script>
    let searchQuery = "foo";
    params = `?searchQuery=${searchQuery}`;
    window.location.assign(window.location.href + params);
</script>
```

## Local storage
Local storage is great for storing data that you don't want to be URL encoded.
Keep in mind, this is limited to 5MB per domain.
```html
<script>
    /* Set values */
    window.localStorage.setItem("name", "joe");
    window.localStorage.setItem("desc", JSON.stringify({joe:4,}));

    /* Get values */
    console.log(window.localStorage.getItem("name"));
    console.log(JSON.parse(window.localStorage.getItem("desc")));

    /* Misc */
    console.log(window.localStorage.key(0)); // returns "name"
    window.localStorage.removeItem("name");
    console.log(window.localStorage.length);
    window.localStorage.clear();

    /* Listen for events */
    window.addEventListener('storage', s => {
        console.log(`local storage item ${s.key} modified.`);
    });
</script>
```