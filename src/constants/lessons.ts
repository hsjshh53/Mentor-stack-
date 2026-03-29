import { LessonContent } from '../types';

export const LESSON_CONTENT: Record<string, LessonContent> = {
  'what-is-coding': {
    id: 'what-is-coding',
    title: 'What is Coding?',
    todayYouAreLearning: 'The fundamental concept of programming and how humans communicate with machines.',
    whyItMatters: 'Coding is the backbone of the modern world. Understanding it opens doors to building anything you can imagine.',
    explanation: 'Coding is the process of writing instructions for a computer to execute. Computers are incredibly fast but not very smart—they need precise, step-by-step guidance to perform even the simplest tasks. We use programming languages as a bridge between human logic and machine execution.',
    analogy: 'Think of coding like writing a recipe. If you tell a robot to "make a sandwich," it won\'t know where to start. You must tell it: 1. Open the cupboard. 2. Take out two slices of bread. 3. Spread peanut butter on one slice. That level of detail is exactly what coding is.',
    visualExplanation: 'Imagine a flowchart where each box is a single, clear instruction. If the condition is met, follow one arrow; if not, follow another. This logical flow is the heart of every program.',
    codeExample: '// A simple instruction to display text\nconsole.log("Hello, Future Developer!");',
    lineByLine: 'The "console.log" command tells the computer to output whatever is inside the parentheses to the screen. The text inside the quotes is called a "string".',
    commonMistakes: [
      'Assuming the computer can guess your intent.',
      'Overcomplicating simple logic.',
      'Thinking you need to be a math genius to start.'
    ],
    practice: 'Write down the steps to boil an egg as if you were explaining it to a robot that knows nothing.',
    challenge: 'Try to break down the process of "logging into a website" into 10 distinct steps.',
    quiz: [
      {
        question: 'What is a programming language?',
        options: [
          'A way for computers to talk to each other',
          'A bridge between human logic and machine instructions',
          'A type of secret code for hackers',
          'A language only spoken by scientists'
        ],
        correctIndex: 1,
        explanation: 'Programming languages allow humans to write instructions that computers can understand and execute.'
      },
      {
        question: 'How does a computer follow instructions?',
        options: [
          'It guesses what you want',
          'It follows them exactly as written, step-by-step',
          'It only follows the ones it likes',
          'It ignores mistakes automatically'
        ],
        correctIndex: 1,
        explanation: 'Computers are literal; they execute exactly what is written, which is why precision is key.'
      }
    ],
    recap: 'Coding is just a set of instructions. It requires logic, patience, and clear communication.'
  },
  'how-computers-work': {
    id: 'how-computers-work',
    title: 'How Computers Work',
    todayYouAreLearning: 'How hardware and software interact to bring code to life.',
    whyItMatters: 'Knowing how the "brain" of the computer works helps you write more efficient and powerful code.',
    explanation: 'A computer consists of hardware (the physical parts) and software (the code). The CPU (Central Processing Unit) is the brain that executes instructions. RAM (Random Access Memory) is the short-term memory where active data lives. When you run code, the CPU fetches instructions from memory and processes them at lightning speed.',
    analogy: 'Imagine a chef (CPU) in a kitchen. The recipe (Code) is on the counter (RAM). The chef reads the recipe and uses tools to create a dish. If the recipe is missing a step, the chef gets stuck.',
    visualExplanation: 'Visualize a factory line. The CPU is the machine at the end, RAM is the conveyor belt bringing parts (data) quickly, and the Hard Drive is the warehouse where everything is stored long-term.',
    codeExample: 'let x = 5;\nlet y = 10;\nconsole.log(x + y);',
    lineByLine: 'First, we store 5 in a memory slot named "x". Then we store 10 in "y". Finally, the CPU adds them and sends the result to the console.',
    commonMistakes: [
      'Thinking computers are "smart"—they are just very fast at following rules.',
      'Confusing storage (Hard Drive) with active memory (RAM).',
      'Ignoring how much memory your code uses.'
    ],
    practice: 'Research the difference between a CPU and a GPU.',
    challenge: 'Explain to a friend how a computer "remembers" what you are typing right now.',
    quiz: [
      {
        question: 'Which part of the computer is considered the "brain"?',
        options: ['RAM', 'Hard Drive', 'CPU', 'Monitor'],
        correctIndex: 2,
        explanation: 'The CPU (Central Processing Unit) handles all the calculations and instruction execution.'
      },
      {
        question: 'What is the purpose of RAM?',
        options: [
          'To store files permanently',
          'To provide short-term memory for active tasks',
          'To make the internet faster',
          'To protect against viruses'
        ],
        correctIndex: 1,
        explanation: 'RAM stores data that the CPU needs to access quickly while a program is running.'
      }
    ],
    recap: 'Hardware provides the power, and software provides the direction. Together, they make computing possible.'
  },
  'how-websites-work': {
    id: 'how-websites-work',
    title: 'How Websites Work',
    todayYouAreLearning: 'The relationship between clients, servers, and the browser.',
    whyItMatters: 'Every frontend developer needs to understand the journey a website takes from a server to a user\'s screen.',
    explanation: 'When you type a URL, your browser (the Client) sends a request over the internet to another computer (the Server). The server finds the requested files (HTML, CSS, JS) and sends them back. Your browser then "renders" these files, turning code into the visual page you see.',
    analogy: 'Think of a restaurant. You are the customer (Client). The waiter is the internet. The kitchen is the Server. You ask for a menu (Request), the waiter brings it, and the kitchen prepares your food (Response).',
    visualExplanation: 'Picture a tennis match. The Client (you) hits the ball (Request) over the net (Internet) to the Server. The Server hits it back (Response) with the website data.',
    codeExample: '<!-- This is what the server sends -->\n<!DOCTYPE html>\n<html>\n  <body>\n    <h1>Welcome to the Web!</h1>\n  </body>\n</html>',
    lineByLine: 'The server sends this text. The browser sees the "h1" tag and knows to display "Welcome to the Web!" as a large heading.',
    commonMistakes: [
      'Thinking websites live "inside" your browser.',
      'Forgetting that the server can be anywhere in the world.',
      'Assuming all browsers display code exactly the same way.'
    ],
    practice: 'Open your browser\'s Network tab (F12 -> Network) and refresh a page to see the requests.',
    challenge: 'Find out what a "DNS" does in the process of loading a website.',
    quiz: [
      {
        question: 'What is the "Client" in web development?',
        options: [
          'The person paying for the website',
          'The computer that stores the files',
          'The user\'s browser or device',
          'The internet service provider'
        ],
        correctIndex: 2,
        explanation: 'In the client-server model, the client is the device or software (like a browser) that requests information.'
      },
      {
        question: 'What does a Server do?',
        options: [
          'It displays the website to the user',
          'It stores and sends website files upon request',
          'It types the code for you',
          'It connects your mouse to the computer'
        ],
        correctIndex: 1,
        explanation: 'Servers "serve" the necessary files to the client so the website can be displayed.'
      }
    ],
    recap: 'Websites are a conversation between a client (requesting) and a server (responding).'
  },
  'internet-basics': {
    id: 'internet-basics',
    title: 'Internet Basics',
    todayYouAreLearning: 'The infrastructure of the web, including IP addresses, DNS, and HTTP.',
    whyItMatters: 'The internet is the platform you build on. Knowing its rules is essential for debugging and deployment.',
    explanation: 'The internet is a global network of connected computers. Every device has a unique "IP Address" (like a phone number). Since numbers are hard to remember, we use "Domain Names" (like google.com). A DNS (Domain Name System) acts like a phonebook, translating names into IP addresses so your browser can find the right server.',
    analogy: 'Imagine sending a letter. The IP address is the physical street address. The Domain Name is the name of the building (e.g., "The Empire State Building"). The DNS is the directory that tells the mailman exactly where that building is located.',
    visualExplanation: 'Think of the internet as a massive web of wires and signals. Each intersection is a router or server, and your data "packets" hop from one to the next until they reach their destination.',
    codeExample: '// An example of an HTTP request URL\nhttps://api.example.com/v1/users',
    lineByLine: '"https" is the secure protocol. "api.example.com" is the domain name. "/v1/users" is the specific path to the data.',
    commonMistakes: [
      'Confusing the Internet with the World Wide Web (the web is just one service on the internet).',
      'Thinking "HTTPS" is just for credit card sites (it should be everywhere!).',
      'Not realizing that data travels in small "packets".'
    ],
    practice: 'Use the "ping" command in your terminal to see the IP address of your favorite website.',
    challenge: 'Look up the difference between HTTP and HTTPS.',
    quiz: [
      {
        question: 'What does DNS stand for?',
        options: [
          'Data Network System',
          'Digital Name Service',
          'Domain Name System',
          'Direct Network Serial'
        ],
        correctIndex: 2,
        explanation: 'DNS translates human-readable domain names into machine-readable IP addresses.'
      },
      {
        question: 'What is an IP Address?',
        options: [
          'A secret password for the internet',
          'A unique identifier for a device on a network',
          'The speed of your internet connection',
          'The name of your browser'
        ],
        correctIndex: 1,
        explanation: 'An IP address is a unique numerical label assigned to each device connected to a computer network.'
      }
    ],
    recap: 'The internet is a vast network governed by protocols that ensure data gets to the right place securely.'
  },
  'what-are-websites': {
    id: 'what-are-websites',
    title: 'What are Websites?',
    todayYouAreLearning: 'The three pillars of the web: HTML, CSS, and JavaScript.',
    whyItMatters: 'To build for the web, you need to know how the pieces fit together.',
    explanation: 'A website is just a collection of files stored on a computer (server) that your browser (client) downloads and displays. HTML provides the structure, CSS provides the style, and JavaScript provides the interactivity.',
    analogy: 'Think of a house. HTML is the wooden frame and walls. CSS is the paint and furniture. JavaScript is the electricity and plumbing that makes things work.',
    visualExplanation: 'Visualize a car. HTML is the chassis and engine. CSS is the color, leather seats, and sleek body. JavaScript is the dashboard, GPS, and self-parking features.',
    codeExample: '<!-- HTML -->\n<h1>Hello</h1>\n\n/* CSS */\nh1 { color: blue; }\n\n// JS\ndocument.querySelector("h1").innerText = "Hi!";',
    lineByLine: 'The HTML creates a heading. The CSS makes it blue. The JS changes the text from "Hello" to "Hi!".',
    commonMistakes: [
      'Mixing up HTML and CSS.',
      'Thinking a website is a single magic file.',
      'Forgetting that the browser is what actually "renders" the site.'
    ],
    practice: 'Right-click on any website and select "Inspect" to see the HTML code behind it.',
    challenge: 'Can you find the <title> tag of this page using the inspector?',
    quiz: [
      {
        question: 'Which technology is responsible for the "skeleton" or structure of a website?',
        options: ['JavaScript', 'CSS', 'HTML', 'PHP'],
        correctIndex: 2,
        explanation: 'HTML (HyperText Markup Language) defines the structure and content of a web page.'
      }
    ],
    recap: 'Websites are built with HTML (Structure), CSS (Style), and JS (Action).'
  },
  'html-structure': {
    id: 'html-structure',
    title: 'HTML Structure',
    todayYouAreLearning: 'The essential skeleton of every web page, including the doctype, head, and body.',
    whyItMatters: 'Without a proper structure, browsers won\'t know how to interpret your content correctly.',
    explanation: 'Every HTML document follows a strict boilerplate. It starts with a `<!DOCTYPE html>` declaration, followed by the `<html>` tag which wraps everything. Inside, the `<head>` contains metadata (info about the page), and the `<body>` contains everything the user actually sees.',
    analogy: 'Think of an HTML document like a human body. The `<html>` is the skin wrapping everything. The `<head>` is the brain (containing thoughts and info that aren\'t visible), and the `<body>` is the physical form that people interact with.',
    visualExplanation: 'Imagine a set of nested boxes. The biggest box is <html>. Inside it are two smaller boxes: <head> (the hidden brain) and <body> (the visible body). Everything you see on a site lives inside the <body> box.',
    codeExample: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <title>My First Page</title>\n</head>\n<body>\n  <h1>Hello World</h1>\n</body>\n</html>',
    lineByLine: 'The DOCTYPE tells the browser to use modern HTML5. The "lang" attribute specifies the language. The "meta charset" ensures special characters display correctly. The "title" appears in the browser tab.',
    commonMistakes: [
      'Putting visible content (like <h1>) inside the <head>.',
      'Forgetting to close the <html> or <body> tags.',
      'Missing the DOCTYPE declaration.'
    ],
    practice: 'Create a basic HTML file from scratch using this boilerplate.',
    challenge: 'Add a "description" meta tag to your head section.',
    quiz: [
      {
        question: 'Which tag contains the visible content of a website?',
        options: ['<head>', '<html>', '<body>', '<title>'],
        correctIndex: 2,
        explanation: 'The <body> tag is where all visible elements like text, images, and buttons are placed.'
      },
      {
        question: 'What is the purpose of the <head> tag?',
        options: [
          'To display the main heading',
          'To contain metadata and links to styles',
          'To create the footer of the page',
          'To store the main navigation'
        ],
        correctIndex: 1,
        explanation: 'The <head> section is for information about the page that isn\'t directly visible to users.'
      }
    ],
    recap: 'Structure is the foundation. Always start with a clean boilerplate.'
  },
  'tags-elements': {
    id: 'tags-elements',
    title: 'Tags & Elements',
    todayYouAreLearning: 'The building blocks of HTML content: headings, paragraphs, and lists.',
    whyItMatters: 'Tags tell the browser what your content IS, allowing it to display it with the right importance and style.',
    explanation: 'HTML uses tags like `<h1>` for the main title, `<p>` for paragraphs, and `<ul>`/`<li>` for lists. An "element" is the combination of the opening tag, the content, and the closing tag.',
    analogy: 'Tags are like labels on boxes. One box says "Fragile", another says "Heavy". They tell the person handling the boxes (the browser) how to treat what\'s inside.',
    visualExplanation: 'Think of a sandwich. The top bread is the opening tag, the filling is the content, and the bottom bread is the closing tag. Together, they make a complete element.',
    codeExample: '<h1>My Favorite Foods</h1>\n<p>I love cooking and trying new things.</p>\n<ul>\n  <li>Pizza</li>\n  <li>Sushi</li>\n  <li>Tacos</li>\n</ul>',
    lineByLine: 'h1 creates a large heading. p creates a block of text. ul starts an "unordered" (bulleted) list. li defines each item in that list.',
    commonMistakes: [
      'Using <h1> multiple times on one page (it should be for the main title only).',
      'Forgetting to close tags like </p> or </li>.',
      'Nesting tags incorrectly (e.g., <p><ul>...</p></ul>).'
    ],
    practice: 'Write an HTML snippet that includes a heading, two paragraphs, and a numbered list (<ol>).',
    challenge: 'Find out the difference between <ul> and <ol>.',
    quiz: [
      {
        question: 'Which tag is used for a standard paragraph of text?',
        options: ['<text>', '<p>', '<para>', '<span>'],
        correctIndex: 1,
        explanation: 'The <p> tag is the standard way to define a paragraph in HTML.'
      },
      {
        question: 'How many levels of headings does HTML provide?',
        options: ['3', '10', '6', '1'],
        correctIndex: 2,
        explanation: 'HTML provides <h1> through <h6>, with <h1> being the most important.'
      }
    ],
    recap: 'Tags define meaning. Use them correctly to build a clear hierarchy.'
  },
  'links-images': {
    id: 'links-images',
    title: 'Links & Images',
    todayYouAreLearning: 'How to connect pages with links and add visual interest with images.',
    whyItMatters: 'The "Hypertext" in HTML refers to links. They are what make the web a "web". Images make it engaging.',
    explanation: 'Links use the `<a>` (anchor) tag with an `href` attribute. Images use the `<img>` tag with `src` (source) and `alt` (alternative text) attributes. Note that `<img>` is a self-closing tag!',
    analogy: 'A link is like a portal in a video game—step through it to go somewhere else. An image is like a window—it lets you see something without leaving the room.',
    visualExplanation: 'Imagine a map with pins. Each pin is a link (<a>) that takes you to a new location. The images (<img>) are the photos on the map that show you what those places look like.',
    codeExample: '<a href="https://google.com">Visit Google</a>\n<img src="https://picsum.photos/200" alt="A random beautiful image">',
    lineByLine: 'The "href" in the <a> tag is the destination URL. The "src" in <img> is the location of the image file. "alt" describes the image for screen readers.',
    commonMistakes: [
      'Forgetting the "alt" attribute (bad for accessibility!).',
      'Using broken links or incorrect file paths for images.',
      'Not including "https://" in external links.'
    ],
    practice: 'Create a link that points to your favorite website and an image next to it.',
    challenge: 'Make an image act as a link by wrapping the <img> tag inside an <a> tag.',
    quiz: [
      {
        question: 'Which attribute is required for an <a> tag to actually go somewhere?',
        options: ['src', 'link', 'href', 'path'],
        correctIndex: 2,
        explanation: 'The "href" (hypertext reference) attribute specifies the URL of the page the link goes to.'
      },
      {
        question: 'What is the purpose of the "alt" attribute on an <img> tag?',
        options: [
          'To make the image load faster',
          'To provide a text description for accessibility',
          'To change the size of the image',
          'To add a border around the image'
        ],
        correctIndex: 1,
        explanation: 'The "alt" attribute is crucial for accessibility, allowing screen readers to describe the image to visually impaired users.'
      }
    ],
    recap: 'Links connect the web; images bring it to life. Always use descriptive "alt" text!'
  },
  'html-forms': {
    id: 'html-forms',
    title: 'Forms',
    todayYouAreLearning: 'How to collect user data using inputs, labels, and buttons.',
    whyItMatters: 'Forms are how users interact with your site—from logging in to searching for products.',
    explanation: 'Forms allow users to send data to a server. They use the `<form>` tag, containing `<input>` fields (for text, passwords, etc.), `<label>`s (for accessibility), and a `<button type="submit">` to send the data.',
    analogy: 'A form is like a physical application at a bank. You have boxes to fill in your name, address, and a "Submit" button at the bottom to hand it over to the teller.',
    visualExplanation: 'Imagine a physical mailbox. The <form> is the mailbox itself. The <input> fields are the slots where you drop your letters (data). The "Submit" button is the mailman taking the letters away to be processed.',
    codeExample: '<form>\n  <label for="name">Name:</label>\n  <input type="text" id="name" placeholder="Enter your name">\n  <button type="submit">Send</button>\n</form>',
    lineByLine: 'The "for" attribute on the label matches the "id" of the input. "placeholder" shows temporary text. "type=submit" makes the button send the form.',
    commonMistakes: [
      'Forgetting to use <label> tags.',
      'Not specifying the "type" of an input (default is text).',
      'Missing the "name" attribute (needed for servers to read the data).'
    ],
    practice: 'Build a simple login form with an email input, a password input, and a submit button.',
    challenge: 'Research how to create a dropdown menu using the <select> and <option> tags.',
    quiz: [
      {
        question: 'Which tag is used to create a text input field?',
        options: ['<text>', '<input type="text">', '<field>', '<form>'],
        correctIndex: 1,
        explanation: 'The <input> tag with type="text" creates a single-line text field.'
      },
      {
        question: 'Why should you always use a <label> with an <input>?',
        options: [
          'To make the text bold',
          'To improve accessibility and user experience',
          'Because the form won\'t work without it',
          'To save space on the page'
        ],
        correctIndex: 1,
        explanation: 'Labels make forms accessible to screen readers and allow users to click the label to focus the input.'
      }
    ],
    recap: 'Forms are the bridge between users and your data. Keep them accessible and clear.'
  },
  'semantic-html': {
    id: 'semantic-html',
    title: 'Semantic HTML',
    todayYouAreLearning: 'Using meaningful tags like <header>, <nav>, <main>, and <footer>.',
    whyItMatters: 'Semantic HTML improves SEO, accessibility, and code readability.',
    explanation: 'Instead of using `<div>` for everything, we use tags that describe their purpose. `<header>` for the top, `<nav>` for links, `<main>` for the core content, and `<footer>` for the bottom.',
    analogy: 'Think of a newspaper. It has a clear Masthead (Header), Sections (Main), and a bottom area with contact info (Footer). You can tell what each part is just by looking at its structure.',
    visualExplanation: 'Visualize a skeleton. Semantic tags are like the bones—the skull (header), the spine (main), and the feet (footer). They give the body a clear, logical structure that anyone can understand.',
    codeExample: '<header>\n  <nav>Home | About</nav>\n</header>\n<main>\n  <article>My Story</article>\n</main>\n<footer>© 2024</footer>',
    lineByLine: 'header wraps the top info. nav wraps the links. main wraps the unique content. footer wraps the bottom info.',
    commonMistakes: [
      'Using <div> for everything (known as "div-itis").',
      'Using semantic tags incorrectly (e.g., putting the main nav in the footer).',
      'Thinking semantic HTML changes how the page looks (it only changes what it MEANS).'
    ],
    practice: 'Take a simple page you built and replace the generic <div> tags with semantic ones.',
    challenge: 'Find out what the <section> and <aside> tags are used for.',
    quiz: [
      {
        question: 'Which tag should be used for the main navigation links of a site?',
        options: ['<links>', '<nav>', '<header>', '<menu>'],
        correctIndex: 1,
        explanation: 'The <nav> tag is specifically designed to wrap navigation links.'
      },
      {
        question: 'What is a benefit of using Semantic HTML?',
        options: [
          'It makes the page load 10x faster',
          'It helps search engines understand your content better (SEO)',
          'It automatically styles your page with CSS',
          'It prevents hackers from seeing your code'
        ],
        correctIndex: 1,
        explanation: 'Semantic HTML provides context to search engines and assistive technologies, improving SEO and accessibility.'
      }
    ],
    recap: 'Write code that humans and machines can understand. Use semantic tags!'
  },
  'css-basics': {
    id: 'css-basics',
    title: 'CSS Basics',
    todayYouAreLearning: 'Selectors, properties, and values—the core syntax of CSS.',
    whyItMatters: 'CSS is how you turn a plain document into a professional-looking interface.',
    explanation: 'CSS works by selecting an HTML element and applying styles. A rule consists of a selector (e.g., `h1`), a property (e.g., `color`), and a value (e.g., `blue`).',
    analogy: 'If HTML is the house, CSS is the interior designer. The designer says: "Select the walls (Selector) and paint them (Property) blue (Value)." ',
    visualExplanation: 'Imagine a coloring book. The black lines are the HTML. The crayons you use to fill in the shapes are the CSS. You can choose any color or texture for any part of the drawing.',
    codeExample: 'h1 {\n  color: #2ecc71;\n  font-size: 32px;\n  text-align: center;\n}',
    lineByLine: 'h1 is the selector. color changes the text color using a Hex code. font-size sets the height. text-align centers the text.',
    commonMistakes: [
      'Forgetting the semicolon ; at the end of each property.',
      'Misspelling property names (e.g., "collor" instead of "color").',
      'Not understanding the difference between IDs (#) and Classes (.).'
    ],
    practice: 'Write a CSS rule to make all paragraphs have a line-height of 1.6 and a gray color.',
    challenge: 'Learn how to select an element by its class name using a dot (.).',
    quiz: [
      {
        question: 'In the rule `p { color: red; }`, what is "color"?',
        options: ['Selector', 'Value', 'Property', 'Declaration'],
        correctIndex: 2,
        explanation: '"color" is the property you are trying to change.'
      },
      {
        question: 'How do you select an element with an ID of "header" in CSS?',
        options: ['.header', 'header', '#header', '*header'],
        correctIndex: 2,
        explanation: 'The hash symbol (#) is used to select elements by their unique ID.'
      }
    ],
    recap: 'Selector + Property + Value = Style. Master the syntax first!'
  },
  'colors-typography': {
    id: 'colors-typography',
    title: 'Colors & Typography',
    todayYouAreLearning: 'Using Hex, RGB, and HSL colors, plus choosing and styling fonts.',
    whyItMatters: 'Color and type are the most powerful tools for creating a specific mood and brand.',
    explanation: 'Colors can be defined by name (red), Hex (#ff0000), or RGB (255, 0, 0). Typography involves `font-family`, `font-weight`, and `line-height`. We often use Google Fonts to add custom typefaces.',
    analogy: 'Colors are like the paint on a car, and typography is like the dashboard design. One makes it look good from a distance, the other makes it readable and functional up close.',
    visualExplanation: 'Think of a paint palette and a set of stamps. The palette gives you the colors (HEX/RGB), and the stamps give you the different font styles (Serif/Sans-serif). Mixing them correctly creates a unique look.',
    codeExample: 'body {\n  color: rgb(50, 50, 50);\n  background-color: #f4f4f4;\n  font-family: "Inter", sans-serif;\n  line-height: 1.5;\n}',
    lineByLine: 'rgb sets a dark gray. background-color sets a light gray. font-family tries to use "Inter" first. line-height adds space between lines.',
    commonMistakes: [
      'Using too many different fonts (stick to 2 max).',
      'Poor contrast between text and background (hard to read!).',
      'Forgetting to include fallback fonts (like sans-serif).'
    ],
    practice: 'Find a color palette you like on a site like Coolors.co and apply it to your project.',
    challenge: 'Try to use an HSL color value. What do H, S, and L stand for?',
    quiz: [
      {
        question: 'Which property is used to change the thickness of text?',
        options: ['font-style', 'text-weight', 'font-weight', 'thickness'],
        correctIndex: 2,
        explanation: 'font-weight controls how bold or light the text appears.'
      },
      {
        question: 'What is a Hex color code?',
        options: [
          'A 6-digit code representing Red, Green, and Blue',
          'A way to write CSS in German',
          'A type of font family',
          'A layout system'
        ],
        correctIndex: 0,
        explanation: 'Hex codes (e.g., #FFFFFF) are a common way to define colors in web design.'
      }
    ],
    recap: 'Color and type create the vibe. Keep it readable and consistent.'
  },
  'box-model': {
    id: 'box-model',
    title: 'Box Model',
    todayYouAreLearning: 'Understanding content, padding, borders, and margins.',
    whyItMatters: 'The Box Model is the foundation of all web layout. If you don\'t get this, your elements will never go where you want them.',
    explanation: 'Every element in HTML is a rectangular box. The box consists of: 1. Content (the text/image), 2. Padding (space inside the border), 3. Border (the line around the padding), 4. Margin (space outside the border).',
    analogy: 'Imagine a framed picture. The photo is the Content. The white matting around the photo is the Padding. The wooden frame is the Border. The space between this frame and the next picture on the wall is the Margin.',
    visualExplanation: 'Visualize a present. The gift is the Content. The bubble wrap inside the box is the Padding. The cardboard box is the Border. The space between this box and other boxes in the delivery truck is the Margin.',
    codeExample: '.box {\n  width: 300px;\n  padding: 20px;\n  border: 5px solid black;\n  margin: 40px;\n}',
    lineByLine: 'The total width of this box on the screen will be 300 + 20+20 + 5+5 = 350px. The 40px margin pushes other things away.',
    commonMistakes: [
      'Confusing padding (inside) with margin (outside).',
      'Forgetting that padding and borders add to the total width of an element.',
      'Not using `box-sizing: border-box` (a life-saver for layout!).'
    ],
    practice: 'Create two boxes and use margins to push them apart.',
    challenge: 'Look up `box-sizing: border-box` and explain why most developers use it.',
    quiz: [
      {
        question: 'Which property creates space INSIDE an element, between the content and the border?',
        options: ['margin', 'padding', 'border', 'spacing'],
        correctIndex: 1,
        explanation: 'Padding is the inner space of an element.'
      },
      {
        question: 'If an element has a width of 100px and a 10px margin, how much space does it take up horizontally?',
        options: ['100px', '110px', '120px', '90px'],
        correctIndex: 2,
        explanation: 'It takes 100px (width) + 10px (left margin) + 10px (right margin) = 120px.'
      }
    ],
    recap: 'Everything is a box. Content -> Padding -> Border -> Margin.'
  },
  'flexbox': {
    id: 'flexbox',
    title: 'Flexbox',
    todayYouAreLearning: 'Creating flexible 1D layouts with justify-content and align-items.',
    whyItMatters: 'Flexbox makes it incredibly easy to align elements horizontally or vertically without using hacks.',
    explanation: 'Flexbox is a layout mode for a parent container and its children. By setting `display: flex` on the parent, you can control how children are spaced and aligned along a single axis (row or column).',
    analogy: 'Think of a row of seats in a theater. Flexbox lets you decide if the people sit in the middle, spread out to the edges, or bunch up at the start of the row.',
    visualExplanation: 'Think of a rubber band. Flexbox allows the items inside to stretch or shrink to fill the available space, keeping them perfectly aligned no matter how wide the container gets.',
    codeExample: '.container {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}',
    lineByLine: 'display: flex turns on the flexbox magic. justify-content spreads items out. align-items centers them vertically.',
    commonMistakes: [
      'Forgetting to put `display: flex` on the parent container.',
      'Confusing `justify-content` (main axis) with `align-items` (cross axis).',
      'Trying to use flexbox for complex 2D grids (use CSS Grid for that!).'
    ],
    practice: 'Create a navigation bar with a logo on the left and links on the right using flexbox.',
    challenge: 'What does `flex-direction: column` do?',
    quiz: [
      {
        question: 'Which property is used to align items along the main axis (usually horizontal)?',
        options: ['align-items', 'justify-content', 'flex-direction', 'display'],
        correctIndex: 1,
        explanation: 'justify-content handles spacing and alignment along the main axis.'
      },
      {
        question: 'To use Flexbox, where do you apply the `display: flex` property?',
        options: ['To each child element', 'To the parent container', 'To the body tag', 'To the CSS file header'],
        correctIndex: 1,
        explanation: 'Flexbox is initialized on the parent (container) element.'
      }
    ],
    recap: 'Flexbox is for 1D alignment. Parent gets the flex, children get the layout.'
  },
  'css-grid': {
    id: 'css-grid',
    title: 'Grid',
    todayYouAreLearning: 'Building complex 2D layouts using columns and rows.',
    whyItMatters: 'Grid is the most powerful layout system in CSS, allowing you to build entire page structures with ease.',
    explanation: 'CSS Grid allows you to define a grid of columns and rows. You can then place elements exactly where you want them in that grid, even spanning multiple columns or rows.',
    analogy: 'Think of a game of Chess or a spreadsheet. You have a grid of squares, and you can place your pieces (elements) in specific coordinates (cells).',
    visualExplanation: 'Visualize a bento box. Each compartment is a grid cell. You can have one big compartment for rice (spanning two columns) and smaller ones for sides. Grid lets you define these spaces precisely.',
    codeExample: '.grid-container {\n  display: grid;\n  grid-template-columns: 1fr 2fr 1fr;\n  gap: 20px;\n}',
    lineByLine: 'display: grid starts the grid. grid-template-columns creates 3 columns (the middle one is twice as wide). gap adds space between cells.',
    commonMistakes: [
      'Overcomplicating simple layouts that could be done with Flexbox.',
      'Not using the "fr" (fraction) unit, which is much better than percentages.',
      'Forgetting that Grid is for 2D (rows AND columns) while Flex is for 1D.'
    ],
    practice: 'Create a 3x3 photo gallery grid using CSS Grid.',
    challenge: 'Learn how to use `grid-column: span 2` to make an item wider.',
    quiz: [
      {
        question: 'What is the "fr" unit in CSS Grid?',
        options: ['Fixed Resolution', 'Fraction of available space', 'Font Ratio', 'Frame Rate'],
        correctIndex: 1,
        explanation: 'The "fr" unit represents a fraction of the free space in the grid container.'
      },
      {
        question: 'Which property defines the space between grid items?',
        options: ['margin', 'padding', 'gap', 'spacing'],
        correctIndex: 2,
        explanation: 'The "gap" property (formerly grid-gap) sets the gutters between rows and columns.'
      }
    ],
    recap: 'Grid is for 2D layouts. Define your columns and rows, then place your content.'
  },
  'responsive-design': {
    id: 'responsive-design',
    title: 'Responsive Design',
    todayYouAreLearning: 'Using Media Queries to make your site look great on mobile, tablet, and desktop.',
    whyItMatters: 'More people browse the web on phones than on computers. Your site MUST work on small screens.',
    explanation: 'Responsive design uses "Media Queries" to apply different CSS rules based on the screen size. We usually start with a mobile layout and then add rules for larger screens (Mobile-First).',
    analogy: 'Imagine a liquid. It takes the shape of whatever container you pour it into. A responsive website is like a liquid—it flows to fit the screen.',
    visualExplanation: 'Imagine a transformer robot. On a small screen, it\'s a compact car (stacked layout). On a large screen, it unfolds into a giant robot (multi-column layout). Media queries are the triggers for this transformation.',
    codeExample: '@media (min-width: 768px) {\n  .container {\n    flex-direction: row;\n  }\n}',
    lineByLine: 'The @media rule says: "If the screen is at least 768px wide, run this code." Inside, we change the layout to a row.',
    commonMistakes: [
      'Designing for desktop first and trying to "shrink" it for mobile.',
      'Using fixed widths (like 1200px) instead of relative widths (like 100%).',
      'Forgetting to test on real devices.'
    ],
    practice: 'Take a layout you built and use a media query to change the background color on small screens.',
    challenge: 'What is a "breakpoint"?',
    quiz: [
      {
        question: 'What CSS tool is used to apply styles based on screen size?',
        options: ['Flexbox', 'Media Queries', 'Grid', 'Variables'],
        correctIndex: 1,
        explanation: 'Media Queries allow you to create "breakpoints" where the design changes for different devices.'
      },
      {
        question: 'What does "Mobile-First" design mean?',
        options: [
          'Building the mobile version after the desktop version',
          'Only building for mobile phones',
          'Starting the design and code with the smallest screen size first',
          'Making sure the site loads fast on 5G'
        ],
        correctIndex: 2,
        explanation: 'Mobile-first means you write the base CSS for mobile and then use media queries to add complexity for larger screens.'
      }
    ],
    recap: 'Build for mobile first, then expand. Use media queries to adapt your layout.'
  },
  'js-intro': {
    id: 'js-intro',
    title: 'JavaScript Intro',
    todayYouAreLearning: 'What JavaScript is, how it works in the browser, and your first "Hello World".',
    whyItMatters: 'JavaScript is the only language that runs natively in every web browser. It is the engine of the modern web.',
    explanation: 'JavaScript is a high-level, interpreted programming language. It allows you to implement complex features on web pages—from updating content dynamically to controlling multimedia and animating images.',
    analogy: 'If HTML is the skeleton and CSS is the skin/clothes, JavaScript is the nervous system. It allows the body to react to touch, move its limbs, and think.',
    visualExplanation: 'Imagine a puppet. HTML is the wooden body. CSS is the paint and costume. JavaScript is the strings and the puppeteer that make the puppet dance, wave, and interact with the audience.',
    codeExample: 'console.log("Hello from JavaScript!");\nalert("Welcome to the world of logic!");',
    lineByLine: 'console.log prints a message to the browser\'s developer console. alert shows a popup window to the user.',
    commonMistakes: [
      'Confusing Java with JavaScript (they are unrelated).',
      'Forgetting that JavaScript is case-sensitive.',
      'Not using the browser console to check for errors.'
    ],
    practice: 'Open your browser console (F12) and type `console.log("I am a developer");`.',
    challenge: 'Try to use `prompt()` to ask for the user\'s name and then `alert()` it back to them.',
    quiz: [
      {
        question: 'Where does JavaScript typically run?',
        options: ['On the server only', 'In the web browser', 'Inside the CSS file', 'On the hardware directly'],
        correctIndex: 1,
        explanation: 'JavaScript is primarily a client-side language that runs in the user\'s web browser.'
      },
      {
        question: 'Which command is used to print messages to the developer console?',
        options: ['print()', 'log.console()', 'console.log()', 'display()'],
        correctIndex: 2,
        explanation: 'console.log() is the standard way to output information for debugging.'
      }
    ],
    recap: 'JavaScript brings the web to life. It\'s the language of interactivity.'
  },
  'variables-data-types': {
    id: 'variables-data-types',
    title: 'Variables & Data Types',
    todayYouAreLearning: 'Storing data with let and const, and understanding strings, numbers, and booleans.',
    whyItMatters: 'Programming is all about manipulating data. You need to know how to store it and what kind of data you\'re working with.',
    explanation: 'Variables are containers for storing data values. We use `let` for values that can change and `const` for values that stay the same. Common data types include Strings (text), Numbers, and Booleans (true/false).',
    analogy: 'A variable is like a labeled box in a warehouse. The label is the variable name, and the item inside is the data. Some boxes are taped shut (const), while others can be opened and swapped (let).',
    visualExplanation: 'Visualize a row of lockers. Each locker has a name (variable name) and contains something inside (data). Some lockers are permanently locked (const), while others can be opened to change their contents (let).',
    codeExample: 'const name = "Mentor";\nlet score = 0;\nscore = score + 10;\nconst isLearning = true;',
    lineByLine: 'const name creates a permanent string. let score creates a number that we then update. const isLearning creates a boolean.',
    commonMistakes: [
      'Trying to reassign a value to a `const` variable.',
      'Forgetting to use quotes around strings.',
      'Using `var` (it\'s outdated—always use let or const!).'
    ],
    practice: 'Create a variable for your name, your age, and whether you like pizza.',
    challenge: 'What happens if you try to add a number and a string together in JavaScript?',
    quiz: [
      {
        question: 'Which keyword should you use for a variable that will NEVER change?',
        options: ['let', 'var', 'const', 'fixed'],
        correctIndex: 2,
        explanation: 'const (short for constant) is used for variables that should not be reassigned.'
      },
      {
        question: 'What data type is the value "42"?',
        options: ['Number', 'Boolean', 'String', 'Undefined'],
        correctIndex: 2,
        explanation: 'Because it is wrapped in quotes, "42" is treated as a String, not a Number.'
      }
    ],
    recap: 'Use const by default, let when you must. Know your types!'
  },
  'functions-scope': {
    id: 'functions-scope',
    title: 'Functions & Scope',
    todayYouAreLearning: 'Writing reusable blocks of code and understanding where variables live.',
    whyItMatters: 'Functions allow you to write code once and use it many times, making your programs organized and efficient.',
    explanation: 'A function is a block of code designed to perform a particular task. It is executed when "called". Scope determines the accessibility of variables—some are global, others are only available inside a function.',
    analogy: 'A function is like a recipe. You write it down once, and whenever you want that dish, you just follow the recipe (call the function). The ingredients inside the kitchen (local scope) aren\'t visible to people outside on the street (global scope).',
    visualExplanation: 'Think of a remote control. Each button is a function. You don\'t need to know how the wires inside work; you just press the button (call the function) to get a specific result (change the channel).',
    codeExample: 'function greet(user) {\n  let message = "Hello " + user;\n  return message;\n}\nconsole.log(greet("Student"));',
    lineByLine: 'We define a function "greet" that takes a "user" parameter. It creates a local variable "message" and "returns" it. Then we call it with "Student".',
    commonMistakes: [
      'Forgetting to "return" a value from a function.',
      'Trying to use a local variable outside of its function.',
      'Defining a function but forgetting to actually call it.'
    ],
    practice: 'Write a function that takes two numbers and returns their sum.',
    challenge: 'Research "Arrow Functions"—how do they differ from regular functions?',
    quiz: [
      {
        question: 'What is the purpose of the "return" keyword?',
        options: [
          'To stop the program',
          'To send a value back to where the function was called',
          'To repeat the function',
          'To print to the console'
        ],
        correctIndex: 1,
        explanation: 'return outputs a value from a function and ends its execution.'
      },
      {
        question: 'If a variable is defined inside a function, can it be accessed outside?',
        options: ['Yes, always', 'No, it is locally scoped', 'Only if it\'s a const', 'Only if the function is called'],
        correctIndex: 1,
        explanation: 'Variables defined inside a function are local to that function and cannot be accessed from the outside.'
      }
    ],
    recap: 'Functions are recipes for code. Keep your variables scoped correctly!'
  },
  'arrays-objects': {
    id: 'arrays-objects',
    title: 'Arrays & Objects',
    todayYouAreLearning: 'Managing collections of data using lists (arrays) and key-value pairs (objects).',
    whyItMatters: 'Real-world data is complex. You need arrays for lists of items and objects to describe single entities in detail.',
    explanation: 'An Array is an ordered list of values: `[1, 2, 3]`. An Object is a collection of properties: `{ name: "Alex", age: 25 }`. We use these together to build complex data structures.',
    analogy: 'An Array is like a numbered list of students in a class. An Object is like a single student\'s ID card, containing their name, age, and grade.',
    visualExplanation: 'Visualize a shopping list (Array) vs. a product tag (Object). The list is just items in order. The tag has specific details: Price, Size, and Color. Both help you organize your shopping trip.',
    codeExample: 'let fruits = ["Apple", "Banana"];\nlet user = {\n  name: "John",\n  age: 30,\n  isAdmin: false\n};\nconsole.log(fruits[0]);\nconsole.log(user.name);',
    lineByLine: 'fruits[0] accesses the first item in the array (arrays start at 0!). user.name uses "dot notation" to get the name property.',
    commonMistakes: [
      'Forgetting that arrays are zero-indexed (the first item is at index 0).',
      'Using a semicolon instead of a comma between object properties.',
      'Confusing square brackets [] for arrays and curly braces {} for objects.'
    ],
    practice: 'Create an object representing your favorite book, including title, author, and year.',
    challenge: 'How do you add a new item to the end of an array? (Hint: .push())',
    quiz: [
      {
        question: 'What is the index of the first item in a JavaScript array?',
        options: ['1', '0', '-1', 'A'],
        correctIndex: 1,
        explanation: 'JavaScript arrays are zero-indexed, meaning counting starts at 0.'
      },
      {
        question: 'Which syntax is used to access a property of an object?',
        options: ['user->name', 'user[name]', 'user.name', 'user:name'],
        correctIndex: 2,
        explanation: 'Dot notation (user.name) is the most common way to access object properties.'
      }
    ],
    recap: 'Arrays for lists, Objects for descriptions. Use them to organize your data.'
  },
  'dom-manipulation': {
    id: 'dom-manipulation',
    title: 'DOM Manipulation',
    todayYouAreLearning: 'How to use JavaScript to change the HTML and CSS of a live web page.',
    whyItMatters: 'This is the "magic" of the web. It\'s how you make buttons do things and content update without a refresh.',
    explanation: 'The DOM (Document Object Model) is the browser\'s internal map of your HTML. JavaScript can use methods like `document.querySelector()` to find elements and change their text, style, or classes.',
    analogy: 'The DOM is like the blueprint of a building that the browser is currently living in. JavaScript is the renovation crew that can move walls, paint rooms, and add new windows while the browser is still inside.',
    visualExplanation: 'Imagine a tree structure. The <html> is the trunk, <body> is a branch, and each <div> or <p> is a leaf. JavaScript can climb this tree, find a specific leaf, and change its color or pluck it off entirely.',
    codeExample: 'const btn = document.querySelector("button");\nbtn.addEventListener("click", () => {\n  document.body.style.backgroundColor = "blue";\n});',
    lineByLine: 'We find the button. We listen for a "click" event. When it happens, we change the body\'s background color to blue.',
    commonMistakes: [
      'Trying to manipulate an element before the HTML has finished loading.',
      'Using the wrong selector (e.g., forgetting the "." for a class).',
      'Thinking that changing the DOM changes the original HTML file (it only changes the live page!).'
    ],
    practice: 'Create a button that changes its own text when clicked.',
    challenge: 'How would you add a new <li> element to a <ul> using JavaScript?',
    quiz: [
      {
        question: 'What does DOM stand for?',
        options: [
          'Data Object Model',
          'Document Object Model',
          'Digital Output Method',
          'Direct Object Management'
        ],
        correctIndex: 1,
        explanation: 'DOM stands for Document Object Model, the interface between your code and the browser\'s rendering engine.'
      },
      {
        question: 'Which method is the most versatile for selecting an element from the DOM?',
        options: ['getElementById', 'getElementsByClassName', 'querySelector', 'findTag'],
        correctIndex: 2,
        explanation: 'querySelector allows you to use any CSS selector to find an element.'
      }
    ],
    recap: 'The DOM is your playground. Select, Listen, and Change!'
  },
  'async-js': {
    id: 'async-js',
    title: 'Async JavaScript',
    todayYouAreLearning: 'Handling tasks that take time, like fetching data from an API, using Promises and Async/Await.',
    whyItMatters: 'Modern apps need to talk to servers. You can\'t freeze the whole app while waiting for a response—you need to do it asynchronously.',
    explanation: 'Asynchronous code allows the browser to keep running while waiting for a task to finish. We use `fetch()` to get data from URLs, and `async`/`await` to handle the results cleanly.',
    analogy: 'Synchronous is like a fast-food counter where you wait for your food before the next person can order. Asynchronous is like a sit-down restaurant: you order, get a buzzer (a Promise), and can talk to your friends until the food is ready.',
    visualExplanation: 'Visualize a track race. Synchronous is one runner waiting for the next to finish. Asynchronous is multiple runners on different tracks, all running at once and finishing whenever they can.',
    codeExample: 'async function getData() {\n  const response = await fetch("https://api.example.com/data");\n  const data = await response.json();\n  console.log(data);\n}\ngetData();',
    lineByLine: 'async marks the function as special. await pauses the function until the fetch is done. response.json() converts the raw data into a JS object.',
    commonMistakes: [
      'Forgetting to use the `await` keyword (you\'ll get a Promise object instead of data).',
      'Not handling errors with try/catch blocks.',
      'Thinking that async code runs at the same time as the rest of your code (it actually runs in the background).'
    ],
    practice: 'Try to fetch a random joke from a public API and log it to the console.',
    challenge: 'What is the purpose of a `try...catch` block in async code?',
    quiz: [
      {
        question: 'What does the `await` keyword do?',
        options: [
          'It makes the code run faster',
          'It pauses the function until a Promise is resolved',
          'It stops the whole browser',
          'It repeats the function'
        ],
        correctIndex: 1,
        explanation: 'await tells JavaScript to wait for an asynchronous task to complete before moving to the next line.'
      },
      {
        question: 'Which function is commonly used to make network requests in modern JS?',
        options: ['get()', 'request()', 'fetch()', 'ajax()'],
        correctIndex: 2,
        explanation: 'The fetch() API is the modern standard for making HTTP requests in the browser.'
      }
    ],
    recap: 'Don\'t block the main thread. Use async/await for a smooth user experience.'
  },
  'react-basics': {
    id: 'react-basics',
    title: 'React Basics',
    todayYouAreLearning: 'What React is, why we use it, and the concept of Components.',
    whyItMatters: 'React is the industry standard for building complex, high-performance web applications.',
    explanation: 'React is a JavaScript library for building user interfaces. It uses a "declarative" approach and breaks the UI into small, reusable pieces called Components.',
    analogy: 'Building a site with plain HTML is like building a house out of one giant block of clay. Building with React is like using LEGO bricks—you create small pieces and snap them together.',
    visualExplanation: 'Imagine a puzzle. Each piece is a component. You can build the sky, the trees, and the house separately, then put them all together to create the final picture.',
    codeExample: 'function Welcome() {\n  return <h1>Hello, React!</h1>;\n}',
    lineByLine: 'This is a functional component. It looks like a regular JS function but returns something that looks like HTML (called JSX).',
    commonMistakes: [
      'Thinking React is a full framework (it\'s a library!).',
      'Not understanding that React only updates what changes (Virtual DOM).',
      'Trying to use React without a basic understanding of JavaScript.'
    ],
    practice: 'Look at a popular website and try to identify which parts could be individual components.',
    challenge: 'What is JSX?',
    quiz: [
      {
        question: 'Who created React?',
        options: ['Google', 'Microsoft', 'Facebook (Meta)', 'Apple'],
        correctIndex: 2,
        explanation: 'React was developed and is maintained by Meta (formerly Facebook).'
      },
      {
        question: 'What is the main building block of a React application?',
        options: ['Functions', 'Tags', 'Components', 'Modules'],
        correctIndex: 2,
        explanation: 'Components are the core concept of React, allowing you to build modular and reusable UI parts.'
      }
    ],
    recap: 'React is about components. Think in bricks, not blocks.'
  },
  'components-props': {
    id: 'components-props',
    title: 'Components & Props',
    todayYouAreLearning: 'Creating reusable components and passing data to them using Props.',
    whyItMatters: 'Props allow you to make your components dynamic. One "Button" component can have different text and colors on every page.',
    explanation: 'Components are like functions that return UI. "Props" (short for properties) are the arguments you pass to these functions to customize them.',
    analogy: 'If a component is a "Coffee Machine", the Props are the settings: "Size", "Strength", and "Milk Type". The machine is the same, but the output depends on the props.',
    visualExplanation: 'Think of a template. The component is the layout, and the props are the specific details (Name, Photo, Bio) that fill in the blanks to create a unique profile card every time.',
    codeExample: 'function UserCard(props) {\n  return <div>Name: {props.name}</div>;\n}\n\n// Usage\n<UserCard name="Alex" />',
    lineByLine: 'The UserCard component receives an object called "props". We use curly braces {} to inject the JS value into the JSX.',
    commonMistakes: [
      'Trying to change props inside a component (Props are read-only!).',
      'Forgetting to wrap multiple elements in a single parent tag or a Fragment <>.</>',
      'Not using descriptive names for your props.'
    ],
    practice: 'Create a "Product" component that takes a name and a price as props.',
    challenge: 'What is a "Fragment" in React and why do we use it?',
    quiz: [
      {
        question: 'Are props mutable (can they be changed by the component receiving them)?',
        options: ['Yes', 'No', 'Only if they are strings', 'Only in class components'],
        correctIndex: 1,
        explanation: 'Props are read-only. A component should never modify its own props.'
      },
      {
        question: 'How do you pass a prop called "title" with the value "Hello" to a component named "Header"?',
        options: ['<Header title="Hello" />', '<Header(title="Hello") />', '<Header>{title: "Hello"}</Header>', 'Header.title = "Hello"'],
        correctIndex: 0,
        explanation: 'Props are passed like HTML attributes in JSX.'
      }
    ],
    recap: 'Components are reusable; Props make them dynamic. Keep your data flowing down.'
  },
  'state-hooks': {
    id: 'state-hooks',
    title: 'State & Hooks',
    todayYouAreLearning: 'Using the useState hook to make your components interactive and data-driven.',
    whyItMatters: 'State is the "memory" of a component. It\'s how a component remembers things like "is this checkbox checked?" or "what did the user type?".',
    explanation: 'State is data that changes over time. When state updates, React automatically re-renders the component to show the new data. We use the `useState` hook to add state to functional components.',
    analogy: 'State is like the current score in a basketball game. It changes constantly, and every time it does, the scoreboard (the UI) updates to show the new reality.',
    visualExplanation: 'Visualize a light switch. The state is either "ON" or "OFF". When you flip the switch (update state), the bulb (UI) immediately changes its appearance to match the new state.',
    codeExample: 'import { useState } from "react";\n\nfunction Counter() {\n  const [count, setCount] = useState(0);\n  return <button onClick={() => setCount(count + 1)}>{count}</button>;\n}',
    lineByLine: 'useState(0) sets the initial count to 0. count is the current value, setCount is the function to change it. onClick triggers the update.',
    commonMistakes: [
      'Updating state directly (e.g., `count = count + 1`) instead of using the setter function.',
      'Forgetting that state updates are asynchronous.',
      'Putting hooks inside loops or conditions (they must be at the top level!).'
    ],
    practice: 'Build a simple "Toggle" component that switches between "ON" and "OFF" when clicked.',
    challenge: 'What is the `useEffect` hook used for?',
    quiz: [
      {
        question: 'What happens when a component\'s state changes?',
        options: [
          'The whole page refreshes',
          'The component re-renders',
          'The browser crashes',
          'Nothing happens until you call refresh()'
        ],
        correctIndex: 1,
        explanation: 'React is "reactive"—it automatically updates the UI whenever the underlying state changes.'
      },
      {
        question: 'What does `useState` return?',
        options: [
          'A single value',
          'A function only',
          'An array with the current state and a setter function',
          'An object with all state variables'
        ],
        correctIndex: 2,
        explanation: 'useState returns an array: [stateValue, setStateFunction].'
      }
    ],
    recap: 'State is memory. Use hooks to manage it. Never mutate state directly!'
  },
  'react-router': {
    id: 'react-router',
    title: 'React Router',
    todayYouAreLearning: 'Creating multi-page applications with client-side routing.',
    whyItMatters: 'Users expect to navigate between "pages" (like /about or /contact) without the whole site reloading.',
    explanation: 'React Router is a library that allows you to define "routes". It listens to the URL and renders different components based on the path, all without a page refresh.',
    analogy: 'React Router is like a GPS for your app. You tell it: "If the user goes to /home, show the Home component. If they go to /settings, show the Settings component."',
    visualExplanation: 'Imagine a house with many rooms. React Router is the hallway. Depending on which door (URL) you open, you see a completely different room (Component), but you never leave the house.',
    codeExample: '<BrowserRouter>\n  <Routes>\n    <Route path="/" element={<Home />} />\n    <Route path="/about" element={<About />} />\n  </Routes>\n</BrowserRouter>',
    lineByLine: 'BrowserRouter wraps the app. Routes holds all possible paths. Route defines a specific path and the component to show.',
    commonMistakes: [
      'Using regular <a> tags instead of the <Link> component (<a> will cause a full page reload!).',
      'Forgetting to wrap your app in <BrowserRouter>.',
      'Not handling "404 Not Found" routes.'
    ],
    practice: 'Set up a basic navigation bar with links to "Home" and "Profile" using React Router.',
    challenge: 'How do you handle dynamic routes like `/user/:id`?',
    quiz: [
      {
        question: 'Which component should you use for navigation to prevent page reloads?',
        options: ['<a>', '<Navigate>', '<Link>', '<Route>'],
        correctIndex: 2,
        explanation: 'The <Link> component from React Router handles navigation internally without refreshing the browser.'
      },
      {
        question: 'What is the purpose of the `path` prop in a `<Route>`?',
        options: [
          'To set the background color',
          'To define the URL that triggers this route',
          'To link to an external website',
          'To store the component\'s data'
        ],
        correctIndex: 1,
        explanation: 'The path prop tells the router which URL corresponds to which component.'
      }
    ],
    recap: 'Routing makes your app feel like a real website. Use <Link> for smooth transitions.'
  },
  'api-integration': {
    id: 'api-integration',
    title: 'API Integration',
    todayYouAreLearning: 'Fetching real-world data in React using useEffect and Fetch.',
    whyItMatters: 'Most apps aren\'t useful without data. You need to know how to pull in info from external services.',
    explanation: 'We use the `useEffect` hook to trigger a data fetch when a component loads. We store the result in state and then render it in the UI.',
    analogy: 'It\'s like a waiter at a restaurant. When you sit down (Component Mounts), the waiter goes to the kitchen (API) to get the menu (Data). When they come back, they put the menu on your table (Update State).',
    visualExplanation: 'Visualize a loading spinner. When the component starts, it shows the spinner (Loading state). Once the data arrives from the API, the spinner disappears and the real content takes its place.',
    codeExample: 'useEffect(() => {\n  fetch("https://api.com/data")\n    .then(res => res.json())\n    .then(data => setData(data));\n}, []);',
    lineByLine: 'useEffect runs after the component renders. The empty array [] means it only runs once. fetch gets the data, then we update state.',
    commonMistakes: [
      'Forgetting the dependency array in useEffect (this can cause an infinite loop!).',
      'Not showing a loading state while the data is being fetched.',
      'Forgetting to handle errors (what if the API is down?).'
    ],
    practice: 'Fetch a list of users from `https://jsonplaceholder.typicode.com/users` and display their names.',
    challenge: 'How would you show a "Loading..." message while waiting for the API?',
    quiz: [
      {
        question: 'Where is the best place to fetch data in a React component?',
        options: ['In the component body', 'Inside a useEffect hook', 'In the return statement', 'In a separate CSS file'],
        correctIndex: 1,
        explanation: 'useEffect is designed for "side effects" like data fetching, ensuring it happens at the right time in the component lifecycle.'
      },
      {
        question: 'What does an empty dependency array `[]` in useEffect mean?',
        options: [
          'The effect never runs',
          'The effect runs on every render',
          'The effect only runs once, after the initial render',
          'The effect is broken'
        ],
        correctIndex: 2,
        explanation: 'An empty dependency array tells React to only run the effect once when the component "mounts".'
      }
    ],
    recap: 'Fetch data in useEffect, store it in state, and handle loading/error states.'
  },
  'personal-portfolio': {
    id: 'personal-portfolio',
    title: 'Personal Portfolio',
    todayYouAreLearning: 'Building your first professional portfolio to showcase your skills and projects.',
    whyItMatters: 'A portfolio is your digital resume. It\'s the first thing employers look at when hiring a developer.',
    explanation: 'A great portfolio should include: 1. An "About Me" section, 2. A list of your skills, 3. Links to your best projects, 4. A contact form. It should be clean, responsive, and easy to navigate.',
    analogy: 'Your portfolio is like a storefront window. You want to display your best products (projects) in a way that makes people want to come inside and learn more about you.',
    codeExample: '<section id="projects">\n  <h2>My Projects</h2>\n  <div class="project-grid">\n    <!-- Project cards go here -->\n  </div>\n</section>',
    lineByLine: 'We use semantic tags like <section> and <h2>. The project-grid will use Flexbox or Grid for layout.',
    commonMistakes: [
      'Including too many small or unfinished projects.',
      'Not making the portfolio mobile-responsive.',
      'Forgetting to include a link to your GitHub or LinkedIn.'
    ],
    practice: 'Sketch out the layout of your portfolio on paper before you start coding.',
    challenge: 'Add a "Dark Mode" toggle to your portfolio using CSS variables and JavaScript.',
    quiz: [
      {
        question: 'What is the most important part of a developer portfolio?',
        options: ['A fancy animation', 'Your high school grades', 'Links to real, working projects', 'A list of every language you\'ve ever heard of'],
        correctIndex: 2,
        explanation: 'Employers want to see what you can actually build. Quality projects are key.'
      }
    ],
    recap: 'Showcase your best work. Keep it clean, professional, and responsive.'
  },
  'ecommerce-store': {
    id: 'ecommerce-store',
    title: 'E-commerce Store',
    todayYouAreLearning: 'Building a functional product catalog with a shopping cart and checkout flow.',
    whyItMatters: 'E-commerce is a huge part of the web. Building a store teaches you about state management, data flow, and user experience.',
    explanation: 'An e-commerce app involves managing a list of products, allowing users to add them to a "Cart" (state), and calculating the total price. You\'ll use React state to track the cart items across different pages.',
    analogy: 'It\'s like a real grocery store. You have shelves (Product List), a basket (Cart State), and a checkout counter (Payment Flow). The basket follows you around the store until you\'re ready to pay.',
    codeExample: 'const [cart, setCart] = useState([]);\nconst addToCart = (product) => {\n  setCart([...cart, product]);\n};',
    lineByLine: 'We use an array for the cart state. The addToCart function uses the "spread operator" (...) to add a new item without losing the old ones.',
    commonMistakes: [
      'Not handling duplicate items in the cart (e.g., adding the same shirt twice).',
      'Forgetting to update the total price when items are added or removed.',
      'Not saving the cart to local storage (so it disappears on refresh!).'
    ],
    practice: 'Implement a "Remove from Cart" button for your store.',
    challenge: 'Can you add a "Quantity" selector for each item in the cart?',
    quiz: [
      {
        question: 'How do you add an item to an array in state without mutating the original array?',
        options: ['cart.push(item)', 'setCart(cart.concat(item))', 'setCart([...cart, item])', 'Both B and C'],
        correctIndex: 3,
        explanation: 'In React, you should always create a new copy of the state rather than modifying the existing one directly.'
      }
    ],
    recap: 'Manage your cart state carefully. Use the spread operator to update arrays and objects.'
  },
  'final-exam': {
    id: 'final-exam',
    title: 'Final Exam',
    todayYouAreLearning: 'Testing your knowledge across the entire Frontend Developer curriculum.',
    whyItMatters: 'The final exam proves that you have mastered the core concepts and are ready to start building professional applications.',
    explanation: 'The exam covers HTML structure, CSS layout (Flex/Grid), JavaScript logic, and React components. It consists of 20 multiple-choice questions and a final coding challenge.',
    analogy: 'This is like the final boss in a video game. You need to use all the skills and items you\'ve collected throughout the journey to win.',
    codeExample: '// Example Exam Question:\n// What is the difference between "==" and "===" in JavaScript?',
    lineByLine: 'This is a conceptual question. "==" checks for value, while "===" checks for both value and type.',
    commonMistakes: [
      'Rushing through the questions without reading carefully.',
      'Forgetting basic HTML/CSS rules while focusing on React.',
      'Not testing your code challenge in a real browser.'
    ],
    practice: 'Review all previous recaps and common mistakes before starting the exam.',
    challenge: 'Build a fully responsive landing page in under 2 hours.',
    quiz: [
      {
        question: 'Which technology is used for the structure of a web page?',
        options: ['CSS', 'JavaScript', 'HTML', 'React'],
        correctIndex: 2,
        explanation: 'HTML provides the semantic structure for all web content.'
      },
      {
        question: 'What does "L" in HSL stand for?',
        options: ['Level', 'Lightness', 'Length', 'Layer'],
        correctIndex: 1,
        explanation: 'HSL stands for Hue, Saturation, and Lightness.'
      },
      {
        question: 'What is the Virtual DOM?',
        options: [
          'A physical copy of the internet',
          'A lightweight copy of the real DOM used by React for performance',
          'A type of server',
          'A JavaScript variable'
        ],
        correctIndex: 1,
        explanation: 'React uses the Virtual DOM to calculate the most efficient way to update the real UI.'
      }
    ],
    recap: 'You\'ve come a long way! Good luck on the exam and your future as a developer.'
  },
  'git-basics': {
    id: 'git-basics',
    title: 'Git / GitHub',
    todayYouAreLearning: 'How to track changes in your code and collaborate with others using Git.',
    whyItMatters: 'Git is the industry standard for version control. It allows you to "go back in time" if you make a mistake and work with teams without overwriting each other\'s work.',
    explanation: 'Git is a tool that tracks every change you make to your files. GitHub is a website where you can store those tracked files (repositories) and share them with the world.',
    analogy: 'Git is like the "Save" button in a video game, but better. You can create "Save Points" (commits) and even "Alternate Timelines" (branches).',
    codeExample: 'git init\ngit add .\ngit commit -m "My first commit"\ngit push origin main',
    lineByLine: 'Line 1: Start tracking this folder with Git.\nLine 2: Prepare all files to be saved.\nLine 3: Create a "Save Point" with a message describing the changes.\nLine 4: Send your save point to GitHub.',
    commonMistakes: [
      'Forgetting to commit before pushing.',
      'Writing vague commit messages like "fixed stuff".',
      'Committing sensitive info like passwords.'
    ],
    practice: 'Initialize a git repository in a test folder.',
    challenge: 'Can you create a new branch and switch to it?',
    quiz: [
      {
        question: 'What is a "commit" in Git?',
        options: [
          'A way to delete code',
          'A snapshot of your code at a specific point in time',
          'A type of programming language',
          'A connection to the internet'
        ],
        correctIndex: 1,
        explanation: 'A commit saves the current state of your project with a descriptive message.'
      }
    ],
    recap: 'Git tracks changes. GitHub stores them. Together, they make collaboration possible.'
  },
  'apis-rest': {
    id: 'apis-rest',
    title: 'APIs & REST',
    todayYouAreLearning: 'How different software systems talk to each other using APIs.',
    whyItMatters: 'APIs are the glue of the internet. They allow your app to get weather data, process payments, or log in with Google.',
    explanation: 'API stands for Application Programming Interface. REST is a set of rules for how these interfaces should work. Usually, you send a "Request" to a URL and get a "Response" (usually in JSON format).',
    analogy: 'An API is like a waiter in a restaurant. You (the client) give an order (the request) to the waiter (the API), who takes it to the kitchen (the server) and brings back your food (the response).',
    codeExample: 'fetch("https://api.example.com/data")\n  .then(response => response.json())\n  .then(data => console.log(data));',
    lineByLine: 'Line 1: We "fetch" data from a URL.\nLine 2: We convert the raw response into a JSON object.\nLine 3: We show the data in the console.',
    commonMistakes: [
      'Forgetting that APIs can fail (always use .catch!).',
      'Not understanding the difference between GET and POST.',
      'Using an API without an API key when one is required.'
    ],
    practice: 'Find a free public API (like the Pokemon API) and fetch some data.',
    challenge: 'Can you send data to an API using a POST request?',
    quiz: [
      {
        question: 'What does API stand for?',
        options: [
          'Application Programming Interface',
          'Advanced Program Integration',
          'Automated Protocol Interaction',
          'Access Point Information'
        ],
        correctIndex: 0,
        explanation: 'APIs allow different applications to communicate with each other.'
      }
    ],
    recap: 'APIs are for communication. REST is the standard way we do it on the web.'
  },
  'db-fundamentals': {
    id: 'db-fundamentals',
    title: 'Database Fundamentals',
    todayYouAreLearning: 'How to store and manage data permanently in a database.',
    whyItMatters: 'Without a database, all your app\'s data (users, posts, settings) would disappear every time you refreshed the page.',
    explanation: 'A database is a system for storing and organizing data. There are two main types: SQL (Relational, like a spreadsheet) and NoSQL (Document-based, like a collection of JSON files).',
    analogy: 'A database is like a giant digital filing cabinet. You can add new files, find existing ones, update them, or throw them away.',
    codeExample: '// NoSQL (Firebase/MongoDB) Style\nconst user = {\n  id: "123",\n  name: "Alex",\n  email: "alex@example.com"\n};\n\n// SQL Style\n// SELECT * FROM users WHERE id = "123";',
    lineByLine: 'The NoSQL example shows data stored as an object. The SQL example shows a "Query" used to find that data in a table.',
    commonMistakes: [
      'Not planning your data structure before building.',
      'Storing sensitive info like passwords in plain text.',
      'Forgetting to add "indexes" for fast searching.'
    ],
    practice: 'Draw a diagram of how you would store "Posts" and "Comments" in a database.',
    challenge: 'What is the difference between a Primary Key and a Foreign Key?',
    quiz: [
      {
        question: 'Why do we use databases?',
        options: [
          'To make the website faster',
          'To store data permanently',
          'To style the UI',
          'To connect to the internet'
        ],
        correctIndex: 1,
        explanation: 'Databases provide persistent storage for application data.'
      }
    ],
    recap: 'Databases are for storage. Choose the right type for your data and keep it organized.'
  },
  'firebase-auth': {
    id: 'firebase-auth',
    title: 'Firebase Authentication',
    todayYouAreLearning: 'How to securely manage users in your application using Firebase.',
    whyItMatters: 'Security is paramount. You need a reliable way to know who your users are without building a complex security system from scratch.',
    explanation: 'Firebase Authentication provides backend services, easy-to-use SDKs, and ready-made UI libraries to authenticate users to your app. It supports authentication using passwords, phone numbers, popular federated identity providers like Google, Facebook and Twitter, and more.',
    analogy: 'Imagine a high-security building. Instead of building your own locks, cameras, and hiring guards, you hire a professional security firm (Firebase) to handle the entrance. They check IDs and let the right people in.',
    codeExample: `import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const auth = getAuth();
const provider = new GoogleAuthProvider();

const login = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log("Logged in as:", result.user.displayName);
    });
};`,
    lineByLine: 'We import the necessary functions from the Firebase library. We initialize the auth service and a Google provider. The signInWithPopup function opens a window for the user to log in with Google. When successful, we get access to the user object.',
    commonMistakes: ['Storing API keys in public repositories', 'Not handling login errors', 'Forgetting to set up authorized domains in the Firebase console'],
    practice: 'Set up a Firebase project and enable Google Authentication in the console.',
    challenge: 'Try to implement a "Sign Out" button using the signOut(auth) function.',
    quiz: [
      {
        question: 'What is the main benefit of using Firebase Auth?',
        options: ['It makes the app faster', 'It provides secure, ready-to-use authentication', 'It stores images'],
        correctIndex: 1,
        explanation: 'Firebase Auth handles the complex security logic so you don\'t have to.'
      }
    ],
    recap: 'Firebase Auth is a powerful tool for managing users securely with minimal effort.'
  },
  'problem-solving': {
    id: 'problem-solving',
    title: 'Problem Solving for Engineers',
    todayYouAreLearning: 'The systematic approach to breaking down complex problems into solvable steps.',
    whyItMatters: 'Coding is 10% typing and 90% thinking. Being a great developer means being a great problem solver.',
    explanation: 'Problem solving in engineering involves understanding the requirements, breaking the problem into smaller sub-problems (decomposition), identifying patterns, and creating a step-by-step plan (algorithm) before writing any code.',
    analogy: 'Imagine you need to cook a 5-course meal. You don\'t just start throwing ingredients in a pan. You read the recipes, prep the ingredients, and decide the order of cooking. You break a big task into small, manageable steps.',
    codeExample: `// Problem: Find the largest number in a list
function findMax(numbers) {
  let max = numbers[0]; // Start with the first number
  for (let num of numbers) {
    if (num > max) {
      max = num; // Update max if we find a bigger one
    }
  }
  return max;
}`,
    lineByLine: 'We define a function that takes an array. we assume the first number is the biggest. We look at every number in the list. If a number is bigger than our current max, we update it. Finally, we return the result.',
    commonMistakes: ['Starting to code before understanding the problem', 'Trying to solve everything at once', 'Ignoring edge cases (like an empty list)'],
    practice: 'Write down the steps to make a cup of tea as if you were explaining it to a robot.',
    challenge: 'Write a plan to find the average of a list of numbers.',
    quiz: [
      {
        question: 'What is the first step in solving a coding problem?',
        options: ['Open the code editor', 'Understand the problem requirements', 'Ask a friend'],
        correctIndex: 1,
        explanation: 'You cannot solve a problem you don\'t fully understand.'
      }
    ],
    recap: 'Break it down, plan it out, then code it up.'
  },
  'algorithms-101': {
    id: 'algorithms-101',
    title: 'Algorithms 101',
    todayYouAreLearning: 'What algorithms are and why efficiency matters in software.',
    whyItMatters: 'As your data grows, slow code becomes a major problem. Algorithms help you solve problems in the most efficient way possible.',
    explanation: 'An algorithm is simply a set of instructions to complete a task. In computer science, we care about how fast an algorithm runs (Time Complexity) and how much memory it uses (Space Complexity).',
    analogy: 'Imagine looking for a name in a phonebook. You could start at page 1 and look at every name (Linear Search), or you could open it in the middle and keep halving the search area (Binary Search). One is much faster than the other!',
    codeExample: `// Linear Search Algorithm
function search(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i; // Found it!
  }
  return -1; // Not found
}`,
    lineByLine: 'The function takes an array and a target value. It loops through every item. If it finds the target, it returns the position. If the loop finishes without finding it, it returns -1.',
    commonMistakes: ['Using a slow algorithm for a large dataset', 'Not considering the "worst-case" scenario', 'Over-complicating a simple problem'],
    practice: 'Research "Big O Notation" and find out what O(n) means.',
    challenge: 'Can you write a plan for a "Binary Search" algorithm?',
    quiz: [
      {
        question: 'What is an algorithm?',
        options: ['A type of computer', 'A set of instructions to solve a problem', 'A programming language'],
        correctIndex: 1,
        explanation: 'Algorithms are the recipes of the computing world.'
      }
    ],
    recap: 'Algorithms are the heart of efficient software. Choose the right tool for the job.'
  },
  'data-structures': {
    id: 'data-structures',
    title: 'Data Structures',
    todayYouAreLearning: 'How to organize and store data so it can be accessed and modified efficiently.',
    whyItMatters: 'The way you store data determines how fast you can work with it. Choosing the right structure is half the battle in software engineering.',
    explanation: 'Data structures are specialized formats for organizing, processing, retrieving, and storing data. Common structures include Arrays, Linked Lists, Stacks, Queues, Hash Tables, and Trees.',
    analogy: 'Think of data structures like different types of storage in your house. You use a bookshelf for books (easy to browse), a drawer for socks (easy to throw in), and a filing cabinet for documents (easy to find by label). Each has a specific purpose.',
    codeExample: `// Stack Data Structure (LIFO - Last In, First Out)
class Stack {
  constructor() {
    this.items = [];
  }
  push(element) { this.items.push(element); }
  pop() { return this.items.pop(); }
  peek() { return this.items[this.items.length - 1]; }
}`,
    lineByLine: 'We create a Stack class. It uses an array internally. push adds an item to the top. pop removes the top item. peek lets us look at the top item without removing it.',
    commonMistakes: ['Using an array when a hash map would be faster', 'Not understanding the trade-offs of different structures', 'Forgetting to handle empty structures'],
    practice: 'Implement a simple Queue (FIFO - First In, First Out) in JavaScript.',
    challenge: 'Research "Binary Search Trees" and explain how they work.',
    quiz: [
      {
        question: 'Which data structure follows the LIFO principle?',
        options: ['Queue', 'Stack', 'Array', 'Linked List'],
        correctIndex: 1,
        explanation: 'Stack stands for Last-In-First-Out, like a stack of plates.'
      }
    ],
    recap: 'Data structures are the containers for your information. Pick the one that fits your needs.'
  },
  'clean-code': {
    id: 'clean-code',
    title: 'Clean Code Principles',
    todayYouAreLearning: 'How to write code that is easy to read, understand, and maintain.',
    whyItMatters: 'Code is read much more often than it is written. Clean code saves time, reduces bugs, and makes you a better teammate.',
    explanation: 'Clean code is code that is focused, readable, and maintainable. It follows principles like meaningful naming, small functions, the Single Responsibility Principle, and avoiding "magic numbers".',
    analogy: 'Imagine reading a book with no punctuation, random capitalization, and characters with names like "x" and "y". It would be a nightmare! Clean code is like a well-written novel with clear chapters and descriptive names.',
    codeExample: `// Bad Code
function c(a, b) {
  return a * b;
}

// Clean Code
function calculateRectangleArea(width, height) {
  return width * height;
}`,
    lineByLine: 'In the bad example, the names "c", "a", and "b" tell us nothing. In the clean example, the names clearly describe what the function and its parameters represent.',
    commonMistakes: ['Using vague names like "data" or "info"', 'Writing massive functions that do 10 different things', 'Not writing comments for complex logic'],
    practice: 'Take a piece of code you wrote recently and rename the variables to be more descriptive.',
    challenge: 'Research the "DRY" (Don\'t Repeat Yourself) principle and find an example of it.',
    quiz: [
      {
        question: 'What is the primary goal of Clean Code?',
        options: ['To make code run faster', 'To make code readable and maintainable', 'To use fewer lines of code'],
        correctIndex: 1,
        explanation: 'Clean code is about human readability, not just machine execution.'
      }
    ],
    recap: 'Write code for humans first, machines second. Clean code is a professional standard.'
  },
  'what-is-backend': {
    id: 'what-is-backend',
    title: 'What is Backend?',
    todayYouAreLearning: 'The "unseen" part of the web: servers, databases, and application logic.',
    whyItMatters: 'Backend is the brain of every application. It handles data, security, and the complex logic that makes the frontend work.',
    explanation: 'While the frontend is what users see, the backend is what happens behind the scenes. It consists of a server (the computer), an application (the code), and a database (the storage). When you log in, the backend checks your credentials against the database and sends a "success" or "fail" message back to the frontend.',
    analogy: 'Think of a restaurant. The dining area is the Frontend. The kitchen, where the food is actually prepared and the pantry (Database) is stored, is the Backend. You don\'t see the chef, but without them, there is no meal.',
    codeExample: `// A simple server-side response
res.json({
  user: "John Doe",
  status: "Authenticated"
});`,
    lineByLine: 'The "res.json" command sends a JSON object back to the client. This is the standard way for backends to communicate with frontends.',
    commonMistakes: [
      'Thinking backend is just for databases.',
      'Ignoring security—backend is the first line of defense.',
      'Not understanding how the frontend and backend talk to each other.'
    ],
    practice: 'List three things that happen on the backend when you buy something on Amazon.',
    challenge: 'Research the difference between a "Web Server" and an "Application Server".',
    quiz: [
      {
        question: 'Which of these is NOT a core part of the backend?',
        options: ['Server', 'Database', 'Browser', 'Application Logic'],
        correctIndex: 2,
        explanation: 'The browser is the "Client" or "Frontend". The backend lives on the server.'
      }
    ],
    recap: 'Backend is the engine. It powers the data and logic of the web.'
  },
  'node-intro': {
    id: 'node-intro',
    title: 'Node.js Intro',
    todayYouAreLearning: 'Running JavaScript outside the browser using the Node.js runtime.',
    whyItMatters: 'Node.js allows you to use one language (JavaScript) for both frontend and backend, making you a more versatile developer.',
    explanation: 'Node.js is a runtime environment that lets you execute JavaScript on your computer or a server. It uses the same V8 engine as Google Chrome but adds features for interacting with the file system, network, and more.',
    analogy: 'JavaScript used to be like a fish that could only live in the ocean (the Browser). Node.js is like an aquarium that lets the fish live on land (the Server). It\'s the same fish, just in a new environment.',
    codeExample: `// Running this in Node.js
const fs = require('fs');
fs.writeFileSync('hello.txt', 'Hello from Node!');`,
    lineByLine: 'We "require" the file system module. Then we use it to create a new file named "hello.txt" with some text inside.',
    commonMistakes: [
      'Trying to use `window` or `document` in Node.js (they only exist in the browser).',
      'Not understanding that Node.js is asynchronous by nature.',
      'Confusing Node.js with a programming language (it\'s a runtime!).'
    ],
    practice: 'Install Node.js on your computer and run `node -v` in your terminal.',
    challenge: 'Create a simple JS file and run it using the `node filename.js` command.',
    quiz: [
      {
        question: 'What is Node.js?',
        options: ['A new programming language', 'A JavaScript runtime environment', 'A type of database', 'A CSS framework'],
        correctIndex: 1,
        explanation: 'Node.js is a runtime that allows JavaScript to run on servers and local machines.'
      }
    ],
    recap: 'Node.js brings JavaScript to the server. It\'s fast, scalable, and powerful.'
  },
  'npm-basics': {
    id: 'npm-basics',
    title: 'NPM Basics',
    todayYouAreLearning: 'Managing packages and dependencies using the Node Package Manager.',
    whyItMatters: 'NPM gives you access to millions of pieces of pre-written code, so you don\'t have to reinvent the wheel for every project.',
    explanation: 'NPM (Node Package Manager) is the world\'s largest software registry. It allows you to install "packages" (libraries or tools) into your project. The `package.json` file keeps track of everything your project needs to run.',
    analogy: 'Imagine you are building a car. Instead of forging every bolt and gear yourself, you go to a parts store (NPM) and buy the components you need. You keep a manifest (package.json) of everything you bought.',
    codeExample: `// Installing a package
npm install express

// Your package.json will now show:
"dependencies": {
  "express": "^4.18.2"
}`,
    lineByLine: 'The command downloads the "express" library. The package.json file is updated to ensure anyone else working on the project gets the same version.',
    commonMistakes: [
      'Forgetting to run `npm init` at the start of a project.',
      'Deleting `package.json` (never do this!).',
      'Installing too many unnecessary packages (bloat).'
    ],
    practice: 'Run `npm init -y` in a new folder to see the generated package.json file.',
    challenge: 'Find a popular package on npmjs.com and read its documentation.',
    quiz: [
      {
        question: 'What is the purpose of the `package.json` file?',
        options: ['To store the actual code', 'To list the project\'s dependencies and metadata', 'To style the website', 'To connect to the database'],
        correctIndex: 1,
        explanation: 'package.json is the "manifest" that describes your project and its requirements.'
      }
    ],
    recap: 'NPM is your toolbox. Use it to build faster and smarter.'
  },
  'routing-middleware': {
    id: 'routing-middleware',
    title: 'Routing & Middleware',
    todayYouAreLearning: 'Organizing complex apps with routes and using middleware for shared logic.',
    whyItMatters: 'As your app grows, you need a clean way to handle different features and shared tasks like logging or authentication.',
    explanation: 'Routing is how you map URLs to specific code. Middleware are functions that run "in the middle" of a request and a response. They can check if a user is logged in, log the request time, or parse data before it reaches your route.',
    analogy: 'Routing is like the signs in a mall telling you where the food court is. Middleware is like the security guard at the entrance who checks your ID before you can go to certain stores.',
    codeExample: `// Middleware function
app.use((req, res, next) => {
  console.log('Request received at:', Date.now());
  next(); // Move to the next function
});`,
    lineByLine: 'app.use applies this to every request. We log the time. The `next()` call is CRITICAL—it tells Express to keep going to the actual route.',
    commonMistakes: [
      'Forgetting to call `next()` in a middleware function (the request will hang!).',
      'Putting middleware AFTER your routes (it won\'t run for those routes).',
      'Not organizing routes into separate files as the app grows.'
    ],
    practice: 'Write a middleware that logs "Hello" for every request.',
    challenge: 'Research the `body-parser` middleware and why it was used (and what replaced it in modern Express).',
    quiz: [
      {
        question: 'What is the purpose of the `next()` function in middleware?',
        options: ['To stop the request', 'To move to the next middleware or route handler', 'To restart the server', 'To send a response'],
        correctIndex: 1,
        explanation: 'Without `next()`, the request gets stuck in the current middleware and never reaches its destination.'
      }
    ],
    recap: 'Routes define the paths; middleware handles the cross-cutting concerns.'
  },
  'postgresql-intro': {
    id: 'postgresql-intro',
    title: 'PostgreSQL Intro',
    todayYouAreLearning: 'Using a powerful, open-source relational database in your apps.',
    whyItMatters: 'PostgreSQL is widely considered the most advanced and reliable open-source database. It is the go-to choice for many professional projects.',
    explanation: 'PostgreSQL (or "Postgres") is a Relational Database Management System (RDBMS). It is known for its reliability, feature set, and performance. It handles complex data types and large amounts of data with ease.',
    analogy: 'If SQLite is a small filing cabinet in your home office, PostgreSQL is a massive, automated warehouse. Both store things, but Postgres is built for scale and complexity.',
    codeExample: `// Connecting to Postgres in Node.js
const { Client } = require('pg');
const client = new Client({
  user: 'dbuser',
  host: 'database.server.com',
  database: 'mydb',
  password: 'secretpassword',
  port: 5432,
});`,
    lineByLine: 'We use the "pg" library. We provide the connection details (host, user, password). Then we can run SQL queries through this client.',
    commonMistakes: [
      'Hardcoding database credentials in your code (use environment variables!).',
      'Forgetting to close the database connection when finished.',
      'Not using "Migrations" to track changes to your database schema.'
    ],
    practice: 'Research how to install PostgreSQL on your operating system.',
    challenge: 'What is the default port for PostgreSQL?',
    quiz: [
      {
        question: 'What type of database is PostgreSQL?',
        options: ['NoSQL', 'Relational (SQL)', 'Graph', 'Document'],
        correctIndex: 1,
        explanation: 'PostgreSQL is a powerful object-relational database system.'
      }
    ],
    recap: 'Postgres is professional-grade. It\'s reliable, fast, and feature-rich.'
  },
  'nosql-mongodb': {
    id: 'nosql-mongodb',
    title: 'NoSQL & MongoDB',
    todayYouAreLearning: 'Storing flexible, document-based data using MongoDB.',
    whyItMatters: 'NoSQL databases are great for data that doesn\'t fit perfectly into tables, or for apps that need to scale horizontally very quickly.',
    explanation: 'MongoDB is a "Document Database". Instead of tables and rows, it stores data in JSON-like documents. This makes it very flexible—you can add new fields to a document without changing the whole database structure.',
    analogy: 'If SQL is a rigid form you have to fill out, NoSQL is a blank piece of paper where you can write whatever you want. It\'s more flexible, but requires more discipline to keep organized.',
    codeExample: `// A MongoDB Document
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "John Doe",
  "hobbies": ["coding", "hiking"],
  "metadata": { "lastLogin": "2024-03-25" }
}`,
    lineByLine: 'The document looks just like a JavaScript object. It can have nested arrays and objects, which is hard to do in SQL.',
    commonMistakes: [
      'Using NoSQL when the data is highly relational (SQL is better for that).',
      'Not indexing your fields (makes searches very slow).',
      'Thinking NoSQL means "No Schema" (you still need a plan!).'
    ],
    practice: 'Compare a "User" table in SQL with a "User" document in MongoDB.',
    challenge: 'What does "Mongoose" do for MongoDB in Node.js?',
    quiz: [
      {
        question: 'How does MongoDB store data?',
        options: ['In tables and rows', 'In JSON-like documents', 'In a single text file', 'In a graph structure'],
        correctIndex: 1,
        explanation: 'MongoDB is a document-oriented database, storing data in BSON (binary JSON) format.'
      }
    ],
    recap: 'MongoDB is flexible and fast. Great for unstructured or rapidly changing data.'
  },
  'backend-security': {
    id: 'backend-security',
    title: 'Backend Security',
    todayYouAreLearning: 'Protecting your app from common attacks like SQL Injection and XSS.',
    whyItMatters: 'Security is not an "extra" feature—it is a fundamental requirement. One mistake can lead to a massive data breach.',
    explanation: 'Security involves protecting your data and your users. Key concepts include: 1. Input Validation (never trust user data), 2. Hashing Passwords (never store them in plain text), 3. Using HTTPS, 4. Protecting against SQL Injection.',
    analogy: 'Backend security is like the locks, alarms, and cameras on a bank vault. You don\'t just trust people; you verify their identity and ensure they can\'t "trick" the vault into opening.',
    codeExample: `// BAD: Vulnerable to SQL Injection
const query = "SELECT * FROM users WHERE id = " + req.query.id;

// GOOD: Using parameterized queries
const query = "SELECT * FROM users WHERE id = $1";
client.query(query, [req.query.id]);`,
    lineByLine: 'The "bad" example lets a user type code into the URL. The "good" example treats the user input as data only, preventing it from being executed as code.',
    commonMistakes: [
      'Storing passwords in plain text (always use bcrypt!).',
      'Trusting client-side validation alone.',
      'Exposing sensitive error messages to the user.'
    ],
    practice: 'Research the "OWASP Top 10" security risks.',
    challenge: 'What is "Salting" a password?',
    quiz: [
      {
        question: 'Why should you never store passwords in plain text?',
        options: ['It takes up too much space', 'If the database is leaked, everyone\'s password is visible', 'It makes the login slower', 'It\'s against the law'],
        correctIndex: 1,
        explanation: 'Hashing passwords ensures that even if the data is stolen, the actual passwords remain secret.'
      }
    ],
    recap: 'Security is a mindset. Never trust user input, and always protect sensitive data.'
  },
  'jwt-auth': {
    id: 'jwt-auth',
    title: 'JWT Authentication',
    todayYouAreLearning: 'Implementing secure, stateless authentication using JSON Web Tokens.',
    whyItMatters: 'JWT is the modern standard for authentication in APIs and Single Page Applications (SPAs).',
    explanation: 'A JWT is a signed string that contains user information. When a user logs in, the server sends them a JWT. The user then sends this token back with every request. The server can verify the token without checking the database every time.',
    analogy: 'A JWT is like a wristband at a music festival. You show your ID once at the gate (Login), get a wristband (JWT), and then you can just show the wristband to get into different stages (Routes) without showing your ID again.',
    codeExample: `const jwt = require('jsonwebtoken');
const token = jwt.sign({ id: user.id }, 'secret_key', { expiresIn: '1h' });`,
    lineByLine: 'We "sign" a payload (user ID) with a secret key. The token will expire in 1 hour for security.',
    commonMistakes: [
      'Storing sensitive info (like passwords) inside the JWT (anyone can decode it!).',
      'Using a weak secret key.',
      'Not checking the expiration date of the token.'
    ],
    practice: 'Go to jwt.io and try to decode a sample token.',
    challenge: 'What is the difference between "Authentication" and "Authorization"?',
    quiz: [
      {
        question: 'What does JWT stand for?',
        options: ['Java Web Token', 'JSON Web Token', 'Joint Web Task', 'Just Web Text'],
        correctIndex: 1,
        explanation: 'JWT stands for JSON Web Token, a compact and self-contained way for securely transmitting information between parties.'
      }
    ],
    recap: 'JWTs are secure, portable, and perfect for modern web APIs.'
  },
  'api-design': {
    id: 'api-design',
    title: 'API Design',
    todayYouAreLearning: 'Best practices for creating clean, scalable, and developer-friendly APIs.',
    whyItMatters: 'A well-designed API is a joy to use. A poorly designed one is a nightmare that will break your app as it grows.',
    explanation: 'Good API design involves consistency, clear naming, proper versioning (like `/v1/`), and helpful error messages. It should follow REST principles and use the correct HTTP status codes.',
    analogy: 'API design is like designing the controls for a cockpit. Everything should be in a logical place, labeled clearly, and provide feedback when a button is pressed.',
    codeExample: `// Good API Response
{
  "status": "success",
  "data": { "id": 1, "name": "John" }
}

// Bad API Response
"User 1 is John" // (Hard to parse with code!)`,
    lineByLine: 'The good response uses JSON, which is easy for computers to read. It also includes a status field for quick checking.',
    commonMistakes: [
      'Changing an API without versioning (breaks existing apps!).',
      'Using inconsistent naming (e.g., `user_id` in one place, `userId` in another).',
      'Not documenting your API.'
    ],
    practice: 'Write the documentation for a simple "Weather API" endpoint.',
    challenge: 'Research "Swagger" (OpenAPI) and how it helps with API design.',
    quiz: [
      {
        question: 'Why is API versioning important?',
        options: ['To make the URL longer', 'To prevent breaking changes for existing users', 'To make the API faster', 'To hide the code'],
        correctIndex: 1,
        explanation: 'Versioning (like /api/v1/) allows you to update your API without breaking apps that rely on the old version.'
      }
    ],
    recap: 'Design for other developers. Keep it consistent, documented, and versioned.'
  },
  'deployment-basics': {
    id: 'deployment-basics',
    title: 'Deployment Basics',
    todayYouAreLearning: 'Taking your app from your computer to the live internet.',
    whyItMatters: 'Code that only lives on your computer isn\'t a product. Deployment is how you share your work with the world.',
    explanation: 'Deployment involves hosting your code on a server that is always on and connected to the internet. Common platforms include Vercel (for frontend), Heroku or Render (for backend), and AWS (for everything).',
    analogy: 'Building an app is like writing a book. Deployment is like getting it published and put on the shelves of every bookstore in the world.',
    codeExample: `# Common deployment command
git push heroku main`,
    lineByLine: 'This command sends your latest code to the Heroku servers, where it is automatically built and started.',
    commonMistakes: [
      'Forgetting to set environment variables on the production server.',
      'Not testing the production build locally first.',
      'Ignoring logs when a deployment fails.'
    ],
    practice: 'Try to deploy a simple HTML page to GitHub Pages or Vercel.',
    challenge: 'What is "CI/CD"?',
    quiz: [
      {
        question: 'What is "Hosting"?',
        options: ['Writing the code', 'Providing a server where your website files live', 'Designing the logo', 'Buying a domain name'],
        correctIndex: 1,
        explanation: 'Hosting is the service that stores your website and makes it accessible via the internet.'
      }
    ],
    recap: 'Deployment is the finish line. Automate it, monitor it, and celebrate it!'
  },
  'data-analyst-intro': {
    id: 'data-analyst-intro',
    title: 'Data Analyst Intro',
    todayYouAreLearning: 'What a Data Analyst does and the core tools of the trade.',
    whyItMatters: 'Data is the new oil. Companies need analysts to turn raw numbers into actionable insights.',
    explanation: 'Data Analysts collect, process, and perform statistical analyses of data. They use tools like Excel, SQL, Python, and Tableau to find patterns and help businesses make better decisions.',
    analogy: 'A Data Analyst is like a detective. They look at the "clues" (data) left behind by users or systems to figure out what happened and why.',
    codeExample: `// A simple data insight
"Our sales increased by 20% after we changed the button color to green."`,
    lineByLine: 'This is the result of analysis—a clear, actionable statement backed by data.',
    commonMistakes: [
      'Focusing too much on tools and not enough on the "Why".',
      'Not checking data for errors or bias.',
      'Making assumptions without evidence.'
    ],
    practice: 'Find a public dataset on Kaggle.com and look at its description.',
    challenge: 'What is the difference between a Data Analyst and a Data Scientist?',
    quiz: [
      {
        question: 'What is the primary goal of a Data Analyst?',
        options: ['To write complex code', 'To turn data into insights for decision making', 'To build websites', 'To fix computers'],
        correctIndex: 1,
        explanation: 'Analysts help businesses understand their data to make informed choices.'
      }
    ],
    recap: 'Data analysis is about storytelling with numbers. Be curious and precise.'
  },
  'excel-for-data': {
    id: 'excel-for-data',
    title: 'Excel for Data',
    todayYouAreLearning: 'Using advanced Excel features like Pivot Tables and VLOOKUP for analysis.',
    whyItMatters: 'Excel is still the most widely used data tool in the world. Mastering it is essential for any entry-level analyst role.',
    explanation: 'Excel is powerful for small to medium datasets. Pivot Tables allow you to summarize thousands of rows in seconds. Formulas like VLOOKUP or XLOOKUP let you connect data from different sheets.',
    analogy: 'Excel is like a Swiss Army knife. It might not be the best tool for every job, but it has a tool for almost everything, and it\'s always in your pocket.',
    codeExample: `=VLOOKUP(A2, 'Prices'!A:B, 2, FALSE)`,
    lineByLine: 'This formula looks for the value in A2 in the "Prices" sheet and returns the value from the second column.',
    commonMistakes: [
      'Not formatting data as a "Table" (makes formulas harder).',
      'Hardcoding values into formulas instead of using cell references.',
      'Ignoring data cleaning (garbage in, garbage out!).'
    ],
    practice: 'Create a Pivot Table from a simple list of sales data.',
    challenge: 'What is the difference between VLOOKUP and XLOOKUP?',
    quiz: [
      {
        question: 'Which Excel feature is best for summarizing large amounts of data?',
        options: ['Conditional Formatting', 'Pivot Tables', 'Data Validation', 'Spell Check'],
        correctIndex: 1,
        explanation: 'Pivot Tables are the most powerful tool in Excel for data summarization and analysis.'
      }
    ],
    recap: 'Excel is a foundational skill. Master the formulas and the Pivot Tables.'
  },
  'sql-for-data': {
    id: 'sql-for-data',
    title: 'SQL for Data',
    todayYouAreLearning: 'Using SQL to extract and aggregate data for analysis.',
    whyItMatters: 'Most company data lives in SQL databases. You need to know how to get it out and summarize it yourself.',
    explanation: 'For analysts, SQL is about "Reading" data. You\'ll use `GROUP BY` to summarize data (e.g., total sales per month) and `JOIN` to combine data from different tables.',
    analogy: 'SQL is like asking a very specific question to a librarian who has millions of books. "Give me the total number of pages in all Sci-Fi books published in 1995." ',
    codeExample: `SELECT category, SUM(sales)
FROM orders
GROUP BY category
HAVING SUM(sales) > 1000;`,
    lineByLine: 'We select categories and the sum of their sales. We group by category. We only show categories with over 1000 in sales.',
    commonMistakes: [
      'Forgetting to use GROUP BY when using an aggregate function like SUM.',
      'Using the wrong type of JOIN (Inner vs Left).',
      'Not filtering data early with WHERE (slows down the query).'
    ],
    practice: 'Write a query to count how many users signed up each day.',
    challenge: 'What is the difference between WHERE and HAVING?',
    quiz: [
      {
        question: 'Which SQL keyword is used to combine rows from two or more tables?',
        options: ['COMBINE', 'JOIN', 'LINK', 'MERGE'],
        correctIndex: 1,
        explanation: 'JOIN is used to relate data across different tables based on a common column.'
      }
    ],
    recap: 'SQL is the analyst\'s best friend. It\'s how you get the raw material for your insights.'
  },
  'python-for-data': {
    id: 'python-for-data',
    title: 'Python for Data',
    todayYouAreLearning: 'Introduction to Pandas and NumPy for powerful data manipulation.',
    whyItMatters: 'Python is the language of choice for modern data analysis. It handles much larger datasets than Excel and can automate your whole workflow.',
    explanation: 'Python has amazing libraries for data. `NumPy` handles math and arrays. `Pandas` provides "DataFrames" (like Excel sheets in code) that make cleaning and analyzing data incredibly fast.',
    analogy: 'If Excel is a bicycle, Python is a jet engine. It takes more training to use, but it can take you much further and much faster.',
    codeExample: `import pandas as pd
df = pd.read_csv('data.csv')
print(df.describe())`,
    lineByLine: 'We import pandas. We load a CSV file into a "DataFrame". `describe()` gives us a quick statistical summary of the whole dataset.',
    commonMistakes: [
      'Not understanding the difference between a Series and a DataFrame.',
      'Trying to loop through rows manually (use built-in Pandas functions instead!).',
      'Forgetting to handle missing values (NaN).'
    ],
    practice: 'Install the Pandas library and load a small CSV file.',
    challenge: 'What does the `df.head()` function do in Pandas?',
    quiz: [
      {
        question: 'Which Python library is most famous for data manipulation?',
        options: ['Django', 'Flask', 'Pandas', 'PyGame'],
        correctIndex: 2,
        explanation: 'Pandas is the industry standard for data manipulation and analysis in Python.'
      }
    ],
    recap: 'Python scales your analysis. Master Pandas to become a high-level analyst.'
  },
  'data-viz-intro': {
    id: 'data-viz-intro',
    title: 'Data Viz Intro',
    todayYouAreLearning: 'Principles of effective data visualization and choosing the right chart.',
    whyItMatters: 'A great insight is useless if no one understands it. Visualization is how you communicate your findings to others.',
    explanation: 'Data Viz is about choosing the right chart for the right data. Use Line Charts for trends over time, Bar Charts for comparisons, and Scatter Plots for relationships between variables.',
    analogy: 'Data Viz is like translating a complex foreign language into a simple picture. It makes the meaning clear at a glance.',
    codeExample: `// Choosing a chart
Trend over time -> Line Chart
Comparison -> Bar Chart
Part-to-whole -> Pie Chart (use sparingly!)`,
    lineByLine: 'Each data type has a "natural" visual representation that humans find easiest to understand.',
    commonMistakes: [
      'Using too many colors or "chart junk" (distractions).',
      'Using a Pie Chart for more than 3-4 categories.',
      'Not labeling your axes clearly.'
    ],
    practice: 'Find a "bad" chart online and list three ways to improve it.',
    challenge: 'What is "Data-Ink Ratio"?',
    quiz: [
      {
        question: 'Which chart is best for showing a trend over time?',
        options: ['Bar Chart', 'Line Chart', 'Pie Chart', 'Scatter Plot'],
        correctIndex: 1,
        explanation: 'Line charts are perfect for showing how a value changes over a continuous period.'
      }
    ],
    recap: 'Keep it simple. The goal of a chart is clarity, not decoration.'
  },
  'statistics-basics': {
    id: 'statistics-basics',
    title: 'Statistics Basics',
    todayYouAreLearning: 'Understanding Mean, Median, Mode, and Standard Deviation.',
    whyItMatters: 'Statistics is the math behind data analysis. It helps you understand if a pattern is real or just random noise.',
    explanation: 'Mean is the average. Median is the middle value. Mode is the most common value. Standard Deviation tells you how "spread out" the data is from the average.',
    analogy: 'Imagine a class of students. The Mean age tells you the average. The Standard Deviation tells you if they are all the same age (low SD) or a mix of kids and adults (high SD).',
    codeExample: `Data: [10, 20, 20, 30, 70]
Mean: 30
Median: 20
Mode: 20`,
    lineByLine: 'The mean is pulled up by the "70" (an outlier). The median and mode stay at 20, giving a better sense of the "typical" value.',
    commonMistakes: [
      'Relying only on the Mean (it can be skewed by outliers).',
      'Confusing Correlation with Causation.',
      'Not understanding the sample size.'
    ],
    practice: 'Calculate the Mean and Median for the set: [5, 5, 10, 20, 100].',
    challenge: 'What is a "Normal Distribution"?',
    quiz: [
      {
        question: 'Which statistical measure is the "middle" value in a sorted list?',
        options: ['Mean', 'Median', 'Mode', 'Range'],
        correctIndex: 1,
        explanation: 'The median is the value that separates the higher half from the lower half of a data sample.'
      }
    ],
    recap: 'Statistics gives your analysis weight. Understand the distribution, not just the average.'
  },
  'task-manager-api': {
    id: 'task-manager-api',
    title: 'Task Manager API',
    todayYouAreLearning: 'How to build a complete, production-ready REST API using Node.js, Express, and a database.',
    whyItMatters: 'Building a real-world API is the ultimate test of your backend skills. It combines routing, middleware, data persistence, and security.',
    explanation: 'In this project, you will create a Task Manager API. Users should be able to create tasks, mark them as complete, and delete them. You will use Express for the server, a database (like MongoDB or PostgreSQL) for storage, and JWT for authentication.',
    analogy: 'Think of this API like a digital office manager. It receives requests (tasks to do), stores them in a filing cabinet (database), and ensures only authorized employees (authenticated users) can access them.',
    codeExample: '// Example of a POST route to create a task\napp.post("/tasks", authMiddleware, async (req, res) => {\n  const task = new Task({ ...req.body, owner: req.user._id });\n  await task.save();\n  res.status(201).send(task);\n});',
    lineByLine: 'We use a POST route to create a new task. The "authMiddleware" ensures the user is logged in. We create a new task object with the request body and the user\'s ID, then save it to the database.',
    commonMistakes: [
      'Forgetting to validate the request body.',
      'Not handling database connection errors.',
      'Exposing sensitive user data in the API response.'
    ],
    practice: 'Set up the basic Express server and connect it to your database.',
    challenge: 'Add a feature that allows users to filter tasks by their completion status.',
    quiz: [
      {
        question: 'What is the purpose of "authMiddleware" in this project?',
        options: [
          'To style the API response',
          'To ensure only logged-in users can access certain routes',
          'To speed up the database queries',
          'To encrypt the source code'
        ],
        correctIndex: 1,
        explanation: 'Authentication middleware protects routes by verifying the user\'s identity.'
      }
    ],
    recap: 'Building a full API requires careful planning and attention to detail, especially regarding security and data integrity.'
  },
  'social-media-app': {
    id: 'social-media-app',
    title: 'Social Media App',
    todayYouAreLearning: 'How to build a full-stack application with a React frontend and an Express backend.',
    whyItMatters: 'A social media app is a complex project that tests your ability to manage state, handle real-time updates, and connect different layers of an application.',
    explanation: 'You will build a simplified social media app. Users can create profiles, post updates, and "like" other users\' posts. This project will use React for the frontend, Express for the backend, and a database for storage.',
    analogy: 'Building a full-stack app is like building a house. The frontend is the interior design (what people see), the backend is the plumbing and electricity (how things work), and the database is the foundation (where everything is stored).',
    codeExample: '// Frontend (React): Fetching posts\nuseEffect(() => {\n  fetch("/api/posts")\n    .then(res => res.json())\n    .then(data => setPosts(data));\n}, []);',
    lineByLine: 'In the React component, we use the "useEffect" hook to fetch posts from the backend API as soon as the component loads.',
    commonMistakes: [
      'Not handling loading and error states in the frontend.',
      'Overcomplicating the state management.',
      'Forgetting to secure the backend API routes.'
    ],
    practice: 'Create the basic UI for the post feed in React.',
    challenge: 'Implement a real-time "like" feature using WebSockets or periodic polling.',
    quiz: [
      {
        question: 'Which technology is used for the frontend in this project?',
        options: ['Node.js', 'Express', 'React', 'SQL'],
        correctIndex: 2,
        explanation: 'React is a popular frontend library for building modern user interfaces.'
      }
    ],
    recap: 'Full-stack development is about making all the pieces of an application work together seamlessly.'
  },
  'sales-analysis': {
    id: 'sales-analysis',
    title: 'Sales Analysis',
    todayYouAreLearning: 'How to use Python and SQL to analyze real-world sales data and extract insights.',
    whyItMatters: 'Data analysis is a critical skill for businesses. Being able to turn raw sales data into actionable insights can drive growth and efficiency.',
    explanation: 'In this project, you will analyze a dataset of sales transactions. You will use SQL to query the data and Python (with Pandas) to clean and visualize it. Your goal is to identify trends, top-selling products, and areas for improvement.',
    analogy: 'Think of data analysis like being a detective. You have a pile of clues (raw data), and you need to use your tools (SQL, Python) to piece them together and solve the mystery (what\'s happening in the business).',
    codeExample: '# Python (Pandas): Calculating total sales by product\nsales_by_product = df.groupby("product")["amount"].sum()\nprint(sales_by_product)',
    lineByLine: 'We use the "groupby" function in Pandas to group the data by product, then sum the "amount" column for each group to get the total sales.',
    commonMistakes: [
      'Not cleaning the data before analysis (e.g., handling missing values).',
      'Drawing conclusions from a small or biased sample.',
      'Using overly complex visualizations that are hard to understand.'
    ],
    practice: 'Load the sales dataset into a Pandas DataFrame and explore its structure.',
    challenge: 'Create a visualization that shows the monthly sales trend over the past year.',
    quiz: [
      {
        question: 'Which Python library is used for data manipulation in this project?',
        options: ['Flask', 'Pandas', 'Django', 'Pygame'],
        correctIndex: 1,
        explanation: 'Pandas is the standard library for data manipulation and analysis in Python.'
      }
    ],
    recap: 'Data analysis is a powerful tool for understanding the world and making data-driven decisions.'
  },
  'backend-intro': {
    id: 'backend-intro',
    title: 'What is Backend Development?',
    todayYouAreLearning: 'The role of the server, databases, and APIs in modern web applications.',
    whyItMatters: 'The backend is the "brain" of an application. It handles data, security, and complex logic that the user never sees but relies on.',
    explanation: 'Backend development (also called server-side development) focuses on the logic, databases, and servers that power the frontend. When you log into a site, the frontend sends your credentials to the backend, which checks the database and sends back a response.',
    analogy: 'Imagine a restaurant. The frontend is the dining area where customers sit and see the menu. The backend is the kitchen where the food is actually prepared, and the database is the pantry where ingredients are stored.',
    codeExample: `// A simple conceptual example of a backend route
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  // 1. Check database for user
  const user = db.findUser(username);
  
  // 2. Verify password
  if (user && user.password === password) {
    res.status(200).send({ message: "Login successful!" });
  } else {
    res.status(401).send({ message: "Invalid credentials" });
  }
});`,
    lineByLine: 'We define a POST route for "/login". We extract the username and password from the request body. We search our database for the user. If found and the password matches, we send a success message; otherwise, we send an error.',
    commonMistakes: [
      'Thinking the backend is just for databases',
      'Ignoring security on the server side',
      'Hardcoding sensitive data like API keys'
    ],
    practice: 'List three things that happen on the backend when you post a photo to Instagram.',
    challenge: 'Explain the difference between a Client and a Server in your own words.',
    quiz: [
      {
        question: 'Where is the application logic typically stored?',
        options: ['Frontend', 'Backend', 'Browser', 'CSS'],
        correctIndex: 1,
        explanation: 'The backend handles the core logic, data processing, and security of the application.'
      },
      {
        question: 'What is the "Client" in the Client-Server model?',
        options: ['The database', 'The server', 'The user\'s browser or app', 'The internet provider'],
        correctIndex: 2,
        explanation: 'The client is the interface the user interacts with, which makes requests to the server.'
      }
    ],
    recap: 'The backend is responsible for data management, security, and business logic. It communicates with the frontend via APIs.'
  },
  'nodejs-basics': {
    id: 'nodejs-basics',
    title: 'Node.js Fundamentals',
    todayYouAreLearning: 'How to run JavaScript outside of the browser using Node.js.',
    whyItMatters: 'Node.js allows developers to use a single language (JavaScript) for both frontend and backend development, making it highly efficient.',
    explanation: 'Node.js is a JavaScript runtime built on Chrome\'s V8 engine. It allows you to execute JS code on your computer or a server. It is asynchronous and event-driven, making it perfect for building scalable network applications.',
    analogy: 'If JavaScript is a car, the browser was its only road. Node.js is like giving that car a set of wings and an off-road kit—it can now go anywhere, not just on the web.',
    codeExample: `// A simple Node.js script
const fs = require('fs');

// Writing to a file
fs.writeFileSync('hello.txt', 'Hello from MentorStack!');

// Reading from a file
const content = fs.readFileSync('hello.txt', 'utf8');
console.log(content);`,
    lineByLine: 'We import the "fs" (file system) module. We use "writeFileSync" to create a file with text. Then we use "readFileSync" to get that text back and print it to the console.',
    commonMistakes: [
      'Trying to use browser APIs like "window" or "document" in Node.js',
      'Using synchronous functions in a way that blocks the server',
      'Forgetting to export modules'
    ],
    practice: 'Install Node.js on your machine and run a simple "Hello World" script.',
    challenge: 'Create a script that reads a list of names from a file and prints them one by one.',
    quiz: [
      {
        question: 'What engine does Node.js use to run JavaScript?',
        options: ['SpiderMonkey', 'V8', 'Chakra', 'Nitro'],
        correctIndex: 1,
        explanation: 'Node.js uses the V8 engine, the same one used by Google Chrome.'
      },
      {
        question: 'Can you use "document.getElementById" in Node.js?',
        options: ['Yes', 'No'],
        correctIndex: 1,
        explanation: 'No, "document" is a browser-only API. Node.js does not have a DOM.'
      }
    ],
    recap: 'Node.js brings JavaScript to the server. It is fast, scalable, and uses a non-blocking I/O model.'
  },
  'express-intro': {
    id: 'express-intro',
    title: 'Introduction to Express.js',
    todayYouAreLearning: 'How to build web servers quickly using the Express framework.',
    whyItMatters: 'Express is the most popular web framework for Node.js. It simplifies routing, middleware, and server setup.',
    explanation: 'Express is a minimal and flexible Node.js web application framework. It provides a robust set of features for web and mobile applications, making it easy to handle different HTTP requests (GET, POST, etc.) and manage routes.',
    analogy: 'If Node.js is the engine of a car, Express is the dashboard and steering wheel. It makes it much easier for the driver (developer) to control where the car goes.',
    codeExample: `const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Welcome to MentorStack Academy!');
});

app.listen(port, () => {
  console.log(\`Server running at http://localhost:\${port}\`);
});`,
    lineByLine: 'We import express and create an "app" instance. We define a GET route for the root path ("/"). When a user visits, we send a welcome message. Finally, we tell the server to "listen" on port 3000.',
    commonMistakes: [
      'Forgetting to call app.listen()',
      'Not sending a response (the request will hang)',
      'Confusing req (request) and res (response) objects'
    ],
    practice: 'Create an Express server with two routes: "/" and "/about".',
    challenge: 'Add a route "/greet/:name" that says hello to whatever name is provided in the URL.',
    quiz: [
      {
        question: 'What is the purpose of "app.get()"?',
        options: [
          'To download a file',
          'To define a route that handles GET requests',
          'To get data from a database',
          'To style the server'
        ],
        correctIndex: 1,
        explanation: 'app.get() is used to define a route handler for HTTP GET requests.'
      }
    ],
    recap: 'Express simplifies server creation in Node.js. It handles routing and middleware with a clean, easy-to-use API.'
  },
  'rest-apis': {
    id: 'rest-apis',
    title: 'Building RESTful APIs',
    todayYouAreLearning: 'The principles of REST and how to design clean, predictable APIs.',
    whyItMatters: 'REST is the industry standard for web APIs. Following its rules ensures your API is easy for other developers to understand and use.',
    explanation: 'REST (Representational State Transfer) is an architectural style for designing networked applications. It uses standard HTTP methods: GET (read), POST (create), PUT (update), and DELETE (remove). Resources are identified by URLs (e.g., /users, /posts/1).',
    analogy: 'Think of a library. Each book has a unique ID. You "GET" a book to read it, "POST" a new book to the collection, "PUT" a new cover on a book to update it, and "DELETE" a book that is too old.',
    codeExample: `// RESTful routes for "Tasks"
app.get('/tasks', (req, res) => { /* Get all tasks */ });
app.get('/tasks/:id', (req, res) => { /* Get one task */ });
app.post('/tasks', (req, res) => { /* Create a task */ });
app.put('/tasks/:id', (req, res) => { /* Update a task */ });
app.delete('/tasks/:id', (req, res) => { /* Delete a task */ });`,
    lineByLine: 'Each route uses a specific HTTP method and path to perform a "CRUD" (Create, Read, Update, Delete) operation on the "tasks" resource.',
    commonMistakes: [
      'Using GET for everything (even deleting data)',
      'Not using proper HTTP status codes (like 404 for Not Found)',
      'Inconsistent URL naming'
    ],
    practice: 'Design the URL structure for a "Blog" API with posts and comments.',
    challenge: 'Implement a POST route that accepts JSON data and "saves" it to a local array.',
    quiz: [
      {
        question: 'Which HTTP method is used to update an existing resource?',
        options: ['GET', 'POST', 'PUT', 'DELETE'],
        correctIndex: 2,
        explanation: 'PUT (or PATCH) is the standard method for updating resources.'
      },
      {
        question: 'What does "CRUD" stand for?',
        options: [
          'Create, Read, Update, Delete',
          'Copy, Run, Undo, Debug',
          'Create, Remove, Use, Design',
          'Connect, Read, Upload, Disconnect'
        ],
        correctIndex: 0,
        explanation: 'CRUD represents the four basic operations of persistent storage.'
      }
    ],
    recap: 'REST APIs use standard HTTP methods and clear URL structures to manage resources. They are the backbone of modern web communication.'
  },
  'sql-basics': {
    id: 'sql-basics',
    title: 'Introduction to SQL & Databases',
    todayYouAreLearning: 'How to store and query data using Relational Databases and SQL.',
    whyItMatters: 'Most professional applications use databases to store user info, products, and more. SQL is the language used to talk to these databases.',
    explanation: 'SQL (Structured Query Language) is used to manage data in Relational Database Management Systems (RDBMS) like PostgreSQL or MySQL. Data is stored in tables with rows and columns, similar to a spreadsheet but much more powerful.',
    analogy: 'Imagine a giant filing cabinet. Each drawer is a "Table" (e.g., "Users"). Inside each drawer are folders ("Rows"), and each folder has specific fields like "Name" and "Email" ("Columns").',
    codeExample: `-- Create a table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL
);

-- Insert data
INSERT INTO users (name, email) VALUES ('Alex', 'alex@example.com');

-- Query data
SELECT * FROM users WHERE name = 'Alex';`,
    lineByLine: 'We create a "users" table with an ID, name, and email. We insert a new user record. Then we select all columns from the table where the name is "Alex".',
    commonMistakes: [
      'Forgetting the WHERE clause in a DELETE or UPDATE (this deletes/updates EVERYTHING!)',
      'Not using primary keys',
      'Storing passwords in plain text'
    ],
    practice: 'Write a SQL query to find all users who joined in the last 30 days.',
    challenge: 'Create a "products" table and write a query to find the most expensive item.',
    quiz: [
      {
        question: 'What does SQL stand for?',
        options: [
          'Structured Query Language',
          'Simple Query Logic',
          'Server Queue List',
          'Standard Quick Link'
        ],
        correctIndex: 0,
        explanation: 'SQL is the standard language for relational database management.'
      }
    ],
    recap: 'SQL is used to manage structured data in tables. It allows for complex queries, relationships, and data integrity.'
  },
  'mongodb-intro': {
    id: 'mongodb-intro',
    title: 'NoSQL with MongoDB',
    todayYouAreLearning: 'How to work with flexible, document-based databases.',
    whyItMatters: 'NoSQL databases like MongoDB are great for rapidly changing data and scaling large applications.',
    explanation: 'MongoDB is a NoSQL database that stores data in flexible, JSON-like documents. Unlike SQL, you don\'t need a fixed schema (table structure) before you start saving data. This makes it very popular for modern web development.',
    analogy: 'If SQL is a rigid filing cabinet, MongoDB is like a collection of folders where each folder can have different types of papers inside. One folder might have a resume, another might have a photo and a note.',
    codeExample: `// MongoDB Document Example
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "MentorStack",
  "courses": ["Frontend", "Backend"],
  "active": true,
  "metadata": {
    "students": 5000
  }
}`,
    lineByLine: 'This is a BSON (Binary JSON) document. It has a unique ID, strings, an array, a boolean, and even a nested object.',
    commonMistakes: [
      'Not indexing fields (makes queries slow)',
      'Creating too many nested levels',
      'Using NoSQL when the data is highly relational'
    ],
    practice: 'Create a sample JSON document representing a "Movie" with title, year, and actors.',
    challenge: 'Explain when you would choose MongoDB over a SQL database.',
    quiz: [
      {
        question: 'How does MongoDB store data?',
        options: ['In tables', 'In documents', 'In spreadsheets', 'In text files'],
        correctIndex: 1,
        explanation: 'MongoDB is a document-oriented database.'
      }
    ],
    recap: 'MongoDB offers flexibility and scalability by storing data as documents. It is a key tool in the modern developer\'s stack.'
  },
  'auth-basics': {
    id: 'auth-basics',
    title: 'Authentication & Security',
    todayYouAreLearning: 'How to securely log users in and protect their data.',
    whyItMatters: 'Security is non-negotiable. You must know how to handle passwords and sessions safely to protect your users.',
    explanation: 'Authentication is verifying who a user is (login). Authorization is verifying what they are allowed to do. We use tools like "Bcrypt" to hash passwords and "JWT" (JSON Web Tokens) to keep users logged in securely.',
    analogy: 'Authentication is like showing your ID to a bouncer to get into a club. Authorization is the VIP wristband that tells the bouncer you\'re allowed into the private lounge.',
    codeExample: `const bcrypt = require('bcrypt');

// Hashing a password
const password = "mySecretPassword";
const saltRounds = 10;
const hashedPassword = await bcrypt.hash(password, saltRounds);

// Checking a password
const match = await bcrypt.compare(password, hashedPassword);`,
    lineByLine: 'We use Bcrypt to "hash" a password, turning it into a long, unreadable string. We then use "compare" to check if a plain-text password matches the hash stored in our database.',
    commonMistakes: [
      'Storing passwords in plain text (NEVER DO THIS)',
      'Using weak hashing algorithms',
      'Not using HTTPS to encrypt data in transit'
    ],
    practice: 'Research what a "Salt" is in the context of password hashing.',
    challenge: 'Explain the difference between a Session and a JWT.',
    quiz: [
      {
        question: 'What is "Hashing"?',
        options: [
          'A way to compress data',
          'A one-way transformation of data into a fixed-length string',
          'A type of database query',
          'A way to encrypt files'
        ],
        correctIndex: 1,
        explanation: 'Hashing is used to store passwords securely so they cannot be reversed into plain text.'
      }
    ],
    recap: 'Security involves hashing passwords and using tokens for sessions. Always prioritize user data protection.'
  },
  'deployment-intro': {
    id: 'deployment-intro',
    title: 'Deploying Your Backend',
    todayYouAreLearning: 'How to move your server from your computer to the cloud.',
    whyItMatters: 'Code is only useful if people can access it. Deployment is the final step in the development lifecycle.',
    explanation: 'Deployment means putting your application on a server that is connected to the internet 24/7. We use platforms like Heroku, Render, or AWS. We also use "Environment Variables" to keep our secrets (like database passwords) safe in the cloud.',
    analogy: 'Building an app on your computer is like writing a book in your diary. Deploying it is like publishing that book and putting it in every bookstore in the world.',
    codeExample: `// Using environment variables
const dbUrl = process.env.DATABASE_URL;
const apiKey = process.env.API_KEY;

if (!dbUrl) {
  console.error("Missing DATABASE_URL!");
  process.exit(1);
}`,
    lineByLine: 'We access "process.env" to get configuration values. This allows us to use different databases for development and production without changing the code.',
    commonMistakes: [
      'Committing .env files to GitHub',
      'Hardcoding URLs',
      'Not setting up a production database'
    ],
    practice: 'Create a .env.example file for a project that requires a PORT and a DB_URL.',
    challenge: 'Research the difference between "Vertical Scaling" and "Horizontal Scaling".',
    quiz: [
      {
        question: 'Where should you store your API keys in production?',
        options: ['In the source code', 'In a public GitHub repo', 'In Environment Variables', 'In a text file on the server'],
        correctIndex: 2,
        explanation: 'Environment variables are the secure way to manage configuration in the cloud.'
      }
    ],
    recap: 'Deployment makes your app live. Use environment variables for security and choose a reliable cloud provider.'
  },
  'fullstack-intro': {
    id: 'fullstack-intro',
    title: 'What is Full-Stack Development?',
    todayYouAreLearning: 'The big picture of how frontend and backend work together to create a complete product.',
    whyItMatters: 'Full-stack developers are the "Swiss Army Knives" of tech. They understand the entire lifecycle of a request, from the user\'s click to the database update.',
    explanation: 'Full-stack development involves working on both the client-side (frontend) and server-side (backend). A full-stack developer can build a user interface, set up a server, design a database, and connect them all together. This end-to-end understanding is highly valued in startups and large tech companies alike.',
    analogy: 'Imagine building a car. A frontend developer designs the interior and the body. A backend developer builds the engine and the transmission. A full-stack developer can do both and ensures the steering wheel actually makes the wheels turn.',
    codeExample: `// The Full-Stack Flow
// 1. Frontend (React)
const handleSubmit = async (data) => {
  const response = await fetch('/api/users', {
    method: 'POST',
    body: JSON.stringify(data)
  });
  return response.json();
};

// 2. Backend (Express)
app.post('/api/users', async (req, res) => {
  const newUser = await db.users.create(req.body);
  res.status(201).json(newUser);
});`,
    lineByLine: 'The frontend collects data and sends a POST request to the API. The backend receives that request, saves the data to the database, and sends back the newly created user as a JSON response.',
    commonMistakes: [
      'Focusing too much on one side and neglecting the other',
      'Not understanding how data flows between layers',
      'Overcomplicating the architecture for simple apps'
    ],
    practice: 'Draw a diagram of what happens when a user signs up for a new account on a website.',
    challenge: 'Explain why a company might prefer a full-stack developer over two specialized developers.',
    quiz: [
      {
        question: 'What does "Full-Stack" refer to?',
        options: [
          'Working only on CSS',
          'Working only on databases',
          'Working on both frontend and backend',
          'Working only on mobile apps'
        ],
        correctIndex: 2,
        explanation: 'Full-stack development covers the entire range of technologies needed to build a web application.'
      }
    ],
    recap: 'Full-stack development is about end-to-end product creation. It requires a broad set of skills and a deep understanding of how different systems interact.'
  },
  'frontend-backend-connect': {
    id: 'frontend-backend-connect',
    title: 'Connecting Frontend to Backend',
    todayYouAreLearning: 'How to use Fetch and Axios to communicate between your React app and your Express server.',
    whyItMatters: 'A frontend without a backend is just a static page. Connecting them is what makes your app dynamic and useful.',
    explanation: 'We use HTTP requests to send and receive data between the frontend and backend. In React, we often use the "fetch" API or the "Axios" library inside a "useEffect" hook or an event handler. We must handle loading states, success responses, and errors gracefully.',
    analogy: 'The frontend is like a customer at a restaurant. The backend is the kitchen. The "Fetch" request is the waiter who takes your order to the kitchen and brings your food back to the table.',
    codeExample: `// React Component
const [data, setData] = useState(null);
const [loading, setLoading] = useState(true);

useEffect(() => {
  fetch('https://api.example.com/items')
    .then(res => res.json())
    .then(json => {
      setData(json);
      setLoading(false);
    })
    .catch(err => console.error("Failed to fetch:", err));
}, []);`,
    lineByLine: 'We initialize state for data and loading. In useEffect, we fetch data from an API. We convert the response to JSON, update our state, and set loading to false. We also catch any errors that might occur.',
    commonMistakes: [
      'Forgetting to handle the "Loading" state (user sees a blank screen)',
      'Not handling errors (app crashes or stays stuck)',
      'Hardcoding API URLs instead of using environment variables'
    ],
    practice: 'Use fetch() to get data from a public API (like JSONPlaceholder) and display it in a list.',
    challenge: 'Implement a "Refresh" button that triggers a new fetch request.',
    quiz: [
      {
        question: 'Which hook is most commonly used for data fetching in React?',
        options: ['useState', 'useEffect', 'useContext', 'useReducer'],
        correctIndex: 1,
        explanation: 'useEffect is the standard place to perform side effects like data fetching.'
      }
    ],
    recap: 'Connecting the layers involves making HTTP requests and managing the resulting data and states in your frontend.'
  },
  'state-management': {
    id: 'state-management',
    title: 'Advanced State Management',
    todayYouAreLearning: 'How to manage complex data across your entire application using Context API and Redux.',
    whyItMatters: 'As apps grow, passing data through many layers of components (prop drilling) becomes messy. Global state management solves this.',
    explanation: 'Global state management allows you to store data in a central "store" that any component can access. React\'s "Context API" is great for simple global state (like themes or user info). For very complex apps, "Redux" or "Zustand" provide more structure and debugging tools.',
    analogy: 'Prop drilling is like passing a message through a line of people. Global state is like posting that message on a bulletin board where everyone in the room can see it at once.',
    codeExample: `// React Context Example
const UserContext = createContext();

function App() {
  const [user, setUser] = useState({ name: "Alex" });
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Profile />
    </UserContext.Provider>
  );
}

function Profile() {
  const { user } = useContext(UserContext);
  return <h1>Welcome, {user.name}</h1>;
}`,
    lineByLine: 'We create a Context. In the App, we wrap our components in a Provider and pass the user state. Any child component (like Profile) can then use "useContext" to access that data directly.',
    commonMistakes: [
      'Using global state for everything (even local component state)',
      'Overcomplicating simple apps with Redux',
      'Forgetting to provide the context at the top level'
    ],
    practice: 'Create a "ThemeContext" that allows users to toggle between Light and Dark mode.',
    challenge: 'Research the difference between "Context API" and "Redux". When would you use one over the other?',
    quiz: [
      {
        question: 'What is "Prop Drilling"?',
        options: [
          'A way to style components',
          'Passing data through multiple levels of components that don\'t need it',
          'A type of database query',
          'A way to optimize images'
        ],
        correctIndex: 1,
        explanation: 'Prop drilling makes code harder to maintain and is solved by global state management.'
      }
    ],
    recap: 'Global state management keeps your app organized as it grows. Use Context for simple needs and Redux/Zustand for complex ones.'
  },
  'fullstack-auth': {
    id: 'fullstack-auth',
    title: 'Full-Stack Authentication',
    todayYouAreLearning: 'How to implement a complete login system with JWT and secure cookies.',
    whyItMatters: 'Authentication is the most critical part of any app that handles user data. You must get it right to keep your users safe.',
    explanation: 'In a full-stack app, the frontend sends credentials to the backend. The backend verifies them and sends back a "Token" (usually a JWT). The frontend stores this token (in a cookie or localStorage) and sends it with every future request to prove the user is logged in.',
    analogy: 'It\'s like a hotel. You show your ID at the front desk (Login). They give you a keycard (Token). You use that keycard to open your room and access the gym (Authorized requests).',
    codeExample: `// Backend: Generating a JWT
const jwt = require('jsonwebtoken');
const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
res.json({ token });

// Frontend: Sending the token
const response = await fetch('/api/profile', {
  headers: {
    'Authorization': \`Bearer \${token}\`
  }
});`,
    lineByLine: 'The backend signs a token with the user\'s ID and a secret key. The frontend then includes this token in the "Authorization" header of its requests.',
    commonMistakes: [
      'Storing tokens insecurely',
      'Not setting an expiration time for tokens',
      'Using a weak secret key for signing'
    ],
    practice: 'Explain why we use a "Secret Key" to sign tokens.',
    challenge: 'Implement a "Logout" function that clears the token from the client.',
    quiz: [
      {
        question: 'What does "JWT" stand for?',
        options: [
          'JSON Web Token',
          'Java Web Tool',
          'Joint Web Task',
          'JSON Web Transfer'
        ],
        correctIndex: 0,
        explanation: 'JWT is a standard for securely transmitting information as a JSON object.'
      }
    ],
    recap: 'Full-stack auth involves tokens and secure storage. It bridges the gap between identifying a user and protecting their private data.'
  },
  'fullstack-deployment': {
    id: 'fullstack-deployment',
    title: 'Deploying Full-Stack Apps',
    todayYouAreLearning: 'How to deploy a React + Node.js application to a single platform.',
    whyItMatters: 'Deploying a full-stack app is more complex than a static site. You need to manage both the frontend build and the backend server.',
    explanation: 'To deploy a full-stack app, we usually build the React frontend into static files and have the Express server serve those files. This allows us to host the entire app on a single server. We must also configure our environment variables and database connections for the production environment.',
    analogy: 'It\'s like moving into a new house. You have to pack up all your furniture (Build the frontend), set up the utilities (Configure the backend), and make sure the address is registered (Deploy to a URL).',
    codeExample: `// server.js (Production setup)
const path = require('path');
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}`,
    lineByLine: 'In production, we tell Express to serve the static files from our React build folder. Any request that doesn\'t match an API route will serve the main index.html file.',
    commonMistakes: [
      'Forgetting to build the frontend before deploying',
      'Not setting NODE_ENV to "production"',
      'Mismatched API URLs between dev and prod'
    ],
    practice: 'Research how to use "Proxy" in your package.json for local development.',
    challenge: 'Explain the difference between deploying to a Monolith (one server) vs. Microservices (multiple servers).',
    quiz: [
      {
        question: 'What is the "build" step in React?',
        options: [
          'Writing the code',
          'Compiling the code into optimized static files for production',
          'Connecting to the database',
          'Installing dependencies'
        ],
        correctIndex: 1,
        explanation: 'The build step creates a version of your app that is ready to be served by a web server.'
      }
    ],
    recap: 'Deployment is the final bridge. It requires careful configuration to ensure your frontend and backend work together in the cloud.'
  },
  'data-intro': {
    id: 'data-intro',
    title: 'What is Data Analysis?',
    todayYouAreLearning: 'The process of cleaning, analyzing, and interpreting data to find meaningful insights.',
    whyItMatters: 'Data is the new oil. Companies use data analysis to make better decisions, predict trends, and understand their customers.',
    explanation: 'Data analysis is the science of examining raw data to draw conclusions. It involves several steps: defining the question, collecting data, cleaning it (removing errors), analyzing it (finding patterns), and visualizing it (creating charts).',
    analogy: 'Imagine you are a detective. The raw data is the evidence at a crime scene. Data analysis is the process of connecting the dots to figure out what actually happened.',
    codeExample: `// Simple Data Analysis in JavaScript
const sales = [100, 250, 150, 300, 200];
const totalSales = sales.reduce((acc, curr) => acc + curr, 0);
const averageSales = totalSales / sales.length;

console.log(\`Total: \${totalSales}, Average: \${averageSales}\`);`,
    lineByLine: 'We have an array of sales numbers. We use "reduce" to sum them all up. Then we divide the total by the number of items to find the average.',
    commonMistakes: [
      'Analyzing dirty data (garbage in, garbage out)',
      'Confusing correlation with causation',
      'Not asking the right questions before starting'
    ],
    practice: 'Look at a receipt and identify 3 different types of data you can find on it.',
    challenge: 'Explain why "Cleaning" data is often the most time-consuming part of the job.',
    quiz: [
      {
        question: 'What is the first step in the data analysis process?',
        options: [
          'Cleaning the data',
          'Creating a chart',
          'Defining the question',
          'Writing code'
        ],
        correctIndex: 2,
        explanation: 'You must know what you are trying to solve before you start looking at data.'
      }
    ],
    recap: 'Data analysis turns raw numbers into actionable insights. It\'s a systematic process of discovery.'
  },
  'excel-basics': {
    id: 'excel-basics',
    title: 'Excel for Data Analysis',
    todayYouAreLearning: 'How to use formulas, functions, and pivot tables to analyze data quickly.',
    whyItMatters: 'Excel is the most widely used data tool in the world. Even advanced analysts use it for quick checks and simple reporting.',
    explanation: 'Excel allows you to organize data in rows and columns. Key features include functions (like SUM, AVERAGE, VLOOKUP), Pivot Tables (for summarizing large datasets), and Charts (for basic visualization).',
    analogy: 'Excel is like a super-powered calculator that can remember thousands of numbers and perform complex math on all of them at once.',
    codeExample: `// Common Excel Formulas
=SUM(A1:A10)       // Adds up values
=AVERAGE(B1:B10)  // Finds the mean
=VLOOKUP("ID", D1:E10, 2, FALSE) // Finds a value in a table`,
    lineByLine: 'SUM adds a range of cells. AVERAGE calculates the mean. VLOOKUP searches for a specific value in one column and returns a value from another column in the same row.',
    commonMistakes: [
      'Hardcoding numbers into formulas instead of using cell references',
      'Not locking cell references ($A$1) when copying formulas',
      'Overloading a single sheet with too much data'
    ],
    practice: 'Create a simple budget in a spreadsheet using SUM and AVERAGE functions.',
    challenge: 'Research what a "Pivot Table" does and why it is so powerful.',
    quiz: [
      {
        question: 'Which Excel function is used to find a value in a table based on a key?',
        options: ['SUM', 'VLOOKUP', 'IF', 'COUNT'],
        correctIndex: 1,
        explanation: 'VLOOKUP is essential for merging data from different tables in Excel.'
      }
    ],
    recap: 'Excel is a foundational tool. Mastering its functions and pivot tables will make you a much faster analyst.'
  },
  'sql-data-analysis': {
    id: 'sql-data-analysis',
    title: 'SQL for Data Analysis',
    todayYouAreLearning: 'How to write complex queries to extract and aggregate data from relational databases.',
    whyItMatters: 'Most company data lives in SQL databases. You need SQL to "talk" to these databases and get the data you need.',
    explanation: 'SQL (Structured Query Language) is used to communicate with databases. For analysis, we primarily use SELECT statements with JOINs (to combine tables), WHERE clauses (to filter data), and GROUP BY (to aggregate data like totals or averages).',
    analogy: 'SQL is like a very specific librarian. Instead of looking through every book yourself, you give the librarian a detailed request, and they bring you exactly the pages you asked for.',
    codeExample: `SELECT category, SUM(price) as total_revenue
FROM orders
JOIN products ON orders.product_id = products.id
WHERE order_date >= '2023-01-01'
GROUP BY category
ORDER BY total_revenue DESC;`,
    lineByLine: 'We select the category and sum of prices. We join the orders and products tables. We filter for orders in 2023. We group the results by category and sort them by revenue.',
    commonMistakes: [
      'Forgetting the GROUP BY clause when using aggregations',
      'Using the wrong type of JOIN (Inner vs. Left)',
      'Not filtering data early enough (making the query slow)'
    ],
    practice: 'Write a SQL query to find the top 5 customers by total spend.',
    challenge: 'Explain the difference between a WHERE clause and a HAVING clause.',
    quiz: [
      {
        question: 'Which SQL keyword is used to combine rows from two or more tables?',
        options: ['COMBINE', 'JOIN', 'MERGE', 'GROUP'],
        correctIndex: 1,
        explanation: 'JOIN is used to link tables based on a related column between them.'
      }
    ],
    recap: 'SQL is the language of data. It allows you to transform millions of rows of raw data into summarized reports.'
  },
  'python-data-analysis': {
    id: 'python-data-analysis',
    title: 'Python for Data Analysis',
    todayYouAreLearning: 'Using the Pandas library to manipulate and analyze large datasets with code.',
    whyItMatters: 'Python is more powerful and flexible than Excel. It can handle much larger datasets and automate repetitive tasks.',
    explanation: 'Python is the leading language for data science. The "Pandas" library provides a "DataFrame" (like a programmable spreadsheet). We use it to clean data, handle missing values, and perform complex calculations that would be difficult in SQL or Excel.',
    analogy: 'If Excel is a bicycle, Python with Pandas is a high-speed train. It takes a bit more effort to learn how to drive, but it can go much further and faster.',
    codeExample: `import pandas as pd

df = pd.read_csv('sales.csv')
# Clean data: fill missing values with 0
df['revenue'] = df['revenue'].fillna(0)
# Group by region and find average revenue
report = df.groupby('region')['revenue'].mean()
print(report)`,
    lineByLine: 'We import pandas. We load a CSV file into a DataFrame. We fill any empty revenue cells with 0. Then we group by region and calculate the average revenue for each.',
    commonMistakes: [
      'Not checking for missing values (NaN) before analyzing',
      'Using loops instead of vectorized Pandas operations (which are faster)',
      'Forgetting to import the necessary libraries'
    ],
    practice: 'Load a small dataset into a Pandas DataFrame and find the maximum value in one column.',
    challenge: 'Research what the "NumPy" library does and how it relates to Pandas.',
    quiz: [
      {
        question: 'What is the primary data structure in Pandas?',
        options: ['List', 'Dictionary', 'DataFrame', 'Tuple'],
        correctIndex: 2,
        explanation: 'A DataFrame is a 2-dimensional labeled data structure, similar to a table or spreadsheet.'
      }
    ],
    recap: 'Python and Pandas give you unlimited power to manipulate data. They are the standard tools for professional data analysts.'
  },
  'data-viz': {
    id: 'data-viz',
    title: 'Data Visualization',
    todayYouAreLearning: 'How to create clear, honest, and impactful charts to tell a story with data.',
    whyItMatters: 'People understand pictures better than numbers. Good visualization makes your insights obvious and persuasive.',
    explanation: 'Data visualization is the graphical representation of information. We use different charts for different purposes: Bar charts for comparisons, Line charts for trends over time, and Scatter plots for relationships between variables.',
    analogy: 'Data visualization is like translating a book from a foreign language into your native tongue. It makes the story accessible to everyone.',
    codeExample: `// Data Viz Principles
1. Choose the right chart (Bar vs Line)
2. Keep it simple (Remove clutter)
3. Use color purposefully (Highlight key points)
4. Label everything clearly`,
    lineByLine: 'These are the golden rules of viz. Always start with the "Why" before picking the "How".',
    commonMistakes: [
      'Using Pie charts for too many categories (hard to read)',
      'Starting the Y-axis at a non-zero value (misleading)',
      'Using too many colors or distracting 3D effects'
    ],
    practice: 'Sketch a chart that shows how your coffee consumption changes throughout the week.',
    challenge: 'Find a "bad" chart online and explain why it is misleading or confusing.',
    quiz: [
      {
        question: 'Which chart type is best for showing a trend over time?',
        options: ['Bar Chart', 'Pie Chart', 'Line Chart', 'Scatter Plot'],
        correctIndex: 2,
        explanation: 'Line charts are the standard for showing how a value changes across a continuous period.'
      }
    ],
    recap: 'Visualization is about communication. A great chart can change minds and drive decisions more effectively than any spreadsheet.'
  },
  'coming-soon': {
    id: 'coming-soon',
    title: 'Coming Soon',
    todayYouAreLearning: 'This path is currently under development.',
    whyItMatters: 'We are constantly expanding our curriculum to include the latest technologies and career paths.',
    explanation: 'Our team of expert developers and educators is hard at work creating high-quality content for this path. We want to ensure that every lesson, project, and exam meets our high standards for excellence.',
    analogy: 'Think of this like a new wing being built in a museum. The doors are closed for now, but something amazing is being prepared inside.',
    codeExample: '// TODO: Implement full curriculum\nconsole.log("Stay tuned!");',
    lineByLine: 'A simple placeholder to let you know that we are working on it.',
    commonMistakes: ['Giving up because a path isn\'t ready yet—try another one in the meantime!'],
    practice: 'Explore the Frontend or Backend paths while you wait.',
    challenge: 'What technology are you most excited to learn in this path?',
    quiz: [
      {
        question: 'Is this path ready yet?',
        options: ['Yes', 'No, but it\'s coming soon!', 'Maybe', 'I don\'t know'],
        correctIndex: 1,
        explanation: 'We are working hard to bring you this content as soon as possible.'
      }
    ],
    recap: 'Patience is a virtue. Great things take time to build.'
  },
  'ai-python-intro': {
    id: 'ai-python-intro',
    title: 'Python for AI',
    todayYouAreLearning: 'The fundamental syntax of Python and why it is the preferred language for AI.',
    whyItMatters: 'Python is the industry standard for AI and machine learning due to its readability and massive ecosystem of libraries.',
    explanation: 'Python is a high-level, interpreted language that emphasizes code readability. In AI, we use it to write complex algorithms with simple, clear syntax. Its vast library support (like NumPy and Pandas) makes it incredibly powerful for data manipulation.',
    analogy: 'Python is like a Swiss Army knife for data. It has a tool for every task, and it\'s easy to carry around and use.',
    codeExample: 'print("Hello, AI World!")\n\n# A simple function\ndef greet(name):\n  return f"Welcome to the AI path, {name}!"\n\nprint(greet("Future Engineer"))',
    lineByLine: 'We print a simple message. Then we define a function that takes a name and returns a greeting. Finally, we call that function and print the result.',
    commonMistakes: ['Forgetting to indent code blocks correctly', 'Using the wrong variable types', 'Forgetting to import necessary libraries'],
    practice: 'Write a Python script that calculates the area of a circle given its radius.',
    challenge: 'Create a function that takes a list of numbers and returns only the even ones using a list comprehension.',
    quiz: [
      {
        question: 'Why is Python popular for AI?',
        options: ['It is the fastest language', 'It has a simple syntax and many AI libraries', 'It only works on AI hardware', 'It was invented by an AI'],
        correctIndex: 1,
        explanation: 'Python\'s readability and the availability of specialized libraries like NumPy, Pandas, and TensorFlow make it ideal for AI.'
      }
    ],
    recap: 'Python is the foundation of modern AI development. Mastering its basics is your first step towards building intelligent systems.'
  },
  'ai-python-data-structures': {
    id: 'ai-python-data-structures',
    title: 'AI Data Structures',
    todayYouAreLearning: 'How to organize and manipulate data using Python\'s built-in structures like lists, dictionaries, and sets.',
    whyItMatters: 'AI models process vast amounts of data. Efficiently organizing this data is crucial for performance and clarity.',
    explanation: 'Data structures are containers for storing and organizing data. Lists are ordered sequences, dictionaries are key-value pairs (like a real dictionary), and sets are collections of unique items. In AI, we use these to store everything from training data to model parameters.',
    analogy: 'A list is like a shopping list, a dictionary is like a phone book, and a set is like a collection of unique stamps.',
    codeExample: 'my_list = [1, 2, 3]\nmy_dict = {"model": "GPT-4", "type": "LLM"}\nmy_set = {1, 2, 2, 3} # Result: {1, 2, 3}',
    lineByLine: 'We create a list of numbers. We create a dictionary with model info. We create a set, which automatically removes the duplicate 2.',
    commonMistakes: ['Trying to access a dictionary key that doesn\'t exist', 'Confusing lists with sets', 'Using the wrong structure for the task'],
    practice: 'Create a dictionary representing a robot with properties like name, version, and tasks.',
    challenge: 'Write a script that takes a list of words and counts the frequency of each word using a dictionary.',
    quiz: [
      {
        question: 'Which data structure does not allow duplicate items?',
        options: ['List', 'Dictionary', 'Set', 'Tuple'],
        correctIndex: 2,
        explanation: 'Sets are unordered collections of unique elements.'
      }
    ],
    recap: 'Choosing the right data structure is essential for writing efficient AI code.'
  },
  'ai-python-libraries': {
    id: 'ai-python-libraries',
    title: 'AI Libraries (NumPy & Pandas)',
    todayYouAreLearning: 'The power of NumPy for numerical operations and Pandas for data manipulation.',
    whyItMatters: 'These libraries are the workhorses of data science. They allow you to perform complex operations on large datasets with minimal code.',
    explanation: 'NumPy provides support for large, multi-dimensional arrays and matrices. Pandas builds on NumPy to provide the DataFrame, a powerful 2D data structure similar to a spreadsheet but much more flexible and faster.',
    analogy: 'NumPy is like a high-speed calculator, and Pandas is like Excel on steroids.',
    codeExample: 'import numpy as np\nimport pandas as pd\n\narr = np.array([1, 2, 3])\ndf = pd.DataFrame({"A": [1, 2], "B": [3, 4]})',
    lineByLine: 'We import the libraries. We create a NumPy array. We create a Pandas DataFrame from a dictionary.',
    commonMistakes: ['Forgetting to import the libraries', 'Confusing NumPy arrays with Python lists', 'Not using vectorized operations (which are much faster)'],
    practice: 'Load a small dataset into a Pandas DataFrame and print the first 5 rows.',
    challenge: 'Perform a matrix multiplication using NumPy.',
    quiz: [
      {
        question: 'What is the primary data structure in Pandas?',
        options: ['Array', 'List', 'DataFrame', 'Dictionary'],
        correctIndex: 2,
        explanation: 'The DataFrame is the central data structure in Pandas, used for representing tabular data.'
      }
    ],
    recap: 'NumPy and Pandas are indispensable tools for any AI Engineer.'
  },
  'ai-math-linear-algebra': {
    id: 'ai-math-linear-algebra',
    title: 'Linear Algebra for AI',
    todayYouAreLearning: 'Vectors, matrices, and their operations in the context of AI.',
    whyItMatters: 'AI models represent data as vectors and matrices. Operations like dot products are the core of how neural networks work.',
    explanation: 'Linear algebra is the study of vectors and linear functions. In AI, an image can be represented as a matrix of pixels, and a neural network\'s weights are also matrices. Training a model involves performing millions of matrix operations.',
    analogy: 'A vector is like a list of coordinates, and a matrix is like a grid of numbers.',
    codeExample: 'import numpy as np\n\nA = np.array([[1, 2], [3, 4]])\nB = np.array([[5, 6], [7, 8]])\nC = np.dot(A, B)',
    lineByLine: 'We create two 2x2 matrices. We perform a matrix multiplication (dot product) using NumPy.',
    commonMistakes: ['Confusing element-wise multiplication with dot product', 'Using incompatible matrix dimensions', 'Forgetting that matrix multiplication is not commutative'],
    practice: 'Calculate the dot product of two vectors by hand.',
    challenge: 'Implement a simple linear regression model using only NumPy and linear algebra.',
    quiz: [
      {
        question: 'What is a matrix in AI?',
        options: ['A single number', 'A list of numbers', 'A rectangular grid of numbers', 'A type of function'],
        correctIndex: 2,
        explanation: 'A matrix is a 2D array of numbers used to represent data and model parameters.'
      }
    ],
    recap: 'Linear algebra is the mathematical language of artificial intelligence.'
  },
  'ai-math-calculus': {
    id: 'ai-math-calculus',
    title: 'Calculus for AI',
    todayYouAreLearning: 'Derivatives, gradients, and how they are used to optimize AI models.',
    whyItMatters: 'Calculus is the engine behind "learning." It tells the model which way to adjust its weights to reduce errors.',
    explanation: 'Calculus deals with change. A derivative tells us the rate of change of a function. In AI, we use the "gradient" (a vector of derivatives) to find the direction that minimizes the error function—a process called Gradient Descent.',
    analogy: 'A derivative is like the slope of a hill. If you want to get to the bottom, you follow the steepest slope downwards.',
    codeExample: '# Conceptual: Gradient Descent\nweight = weight - learning_rate * gradient',
    lineByLine: 'We update the model\'s weight by moving it in the opposite direction of the gradient, scaled by a learning rate.',
    commonMistakes: ['Using a learning rate that is too high (overshooting)', 'Confusing derivatives with integrals', 'Not understanding that gradients point in the direction of steepest increase'],
    practice: 'Find the derivative of f(x) = x^2 + 3x + 5.',
    challenge: 'Explain how the "Chain Rule" in calculus is used in the Backpropagation algorithm.',
    quiz: [
      {
        question: 'What does a gradient represent in AI?',
        options: ['The total error', 'The direction of steepest increase of the error function', 'The final output of the model', 'The number of layers in a network'],
        correctIndex: 1,
        explanation: 'The gradient points towards the steepest increase; we move in the opposite direction to minimize error.'
      }
    ],
    recap: 'Calculus provides the tools to optimize and "train" AI models.'
  },
  'ai-math-statistics': {
    id: 'ai-math-statistics',
    title: 'Statistics for AI',
    todayYouAreLearning: 'Probability, distributions, and how to handle uncertainty in AI.',
    whyItMatters: 'AI is about making predictions under uncertainty. Statistics helps us quantify that uncertainty and make better decisions.',
    explanation: 'Statistics is the science of collecting, analyzing, and interpreting data. In AI, we use probability to estimate the likelihood of an outcome and distributions to understand the spread of our data.',
    analogy: 'Probability is like predicting the weather—it\'s not certain, but we can estimate the chance.',
    codeExample: 'import numpy as np\n\ndata = [1, 2, 2, 3, 4]\nmean = np.mean(data)\nstd_dev = np.std(data)',
    lineByLine: 'We define a small dataset. We calculate the average (mean) and the spread (standard deviation) using NumPy.',
    commonMistakes: ['Assuming all data follows a Normal distribution', 'Confusing correlation with causation', 'Ignoring the sample size'],
    practice: 'Calculate the mean, median, and mode of a dataset.',
    challenge: 'Explain the concept of "Bayes\' Theorem" and its importance in AI.',
    quiz: [
      {
        question: 'What is the "Standard Deviation" used for?',
        options: ['To find the average', 'To measure the spread of data', 'To count the number of items', 'To sort the data'],
        correctIndex: 1,
        explanation: 'Standard deviation measures how much the data points vary from the mean.'
      }
    ],
    recap: 'Statistics is the foundation for understanding data and making reliable predictions.'
  },
  'ai-data-cleaning': {
    id: 'ai-data-cleaning',
    title: 'Data Cleaning for AI',
    todayYouAreLearning: 'Techniques for handling missing values, outliers, and noisy data.',
    whyItMatters: 'Garbage in, garbage out. The quality of your AI model depends entirely on the quality of your data.',
    explanation: 'Data cleaning is the process of preparing raw data for analysis by removing or correcting inaccurate, incomplete, or irrelevant records. This includes handling missing values (imputation) and identifying outliers that might skew the model.',
    analogy: 'It\'s like washing and peeling vegetables before cooking a gourmet meal.',
    codeExample: 'import pandas as pd\n\ndf = pd.read_csv("data.csv")\ndf.dropna(inplace=True) # Remove missing values\ndf["age"].fillna(df["age"].mean(), inplace=True) # Fill missing values',
    lineByLine: 'We load the data. We remove any rows with missing values. Alternatively, we fill missing age values with the average age.',
    commonMistakes: ['Deleting too much data', 'Ignoring outliers without investigation', 'Not documenting the cleaning steps'],
    practice: 'Identify and handle missing values in a sample dataset.',
    challenge: 'Research the "Z-score" method for identifying outliers.',
    quiz: [
      {
        question: 'What is "Imputation" in data cleaning?',
        options: ['Deleting data', 'Filling in missing values', 'Encrypting data', 'Sorting data'],
        correctIndex: 1,
        explanation: 'Imputation is the process of replacing missing data with substituted values.'
      }
    ],
    recap: 'Clean data is the most important ingredient for a successful AI model.'
  },
  'ai-data-visualization': {
    id: 'ai-data-visualization',
    title: 'Data Visualization for AI',
    todayYouAreLearning: 'How to use charts and graphs to gain insights from your data.',
    whyItMatters: 'Visualizations help you see patterns, trends, and outliers that are impossible to spot in raw numbers.',
    explanation: 'Data visualization is the graphical representation of information. In AI, we use it to explore datasets before training and to evaluate model performance after training.',
    analogy: 'A chart is like a map—it shows you where the interesting things are.',
    codeExample: 'import matplotlib.pyplot as plt\nimport seaborn as sns\n\nsns.scatterplot(x="height", y="weight", data=df)\nplt.show()',
    lineByLine: 'We import the visualization libraries. We create a scatter plot to see the relationship between height and weight. We display the plot.',
    commonMistakes: ['Using the wrong chart type', 'Overcrowding a chart with too much info', 'Using misleading scales'],
    practice: 'Create a histogram of a dataset to see its distribution.',
    challenge: 'Create a correlation heatmap to see how different variables in your dataset relate to each other.',
    quiz: [
      {
        question: 'Which plot is best for showing the distribution of a single variable?',
        options: ['Scatter plot', 'Bar chart', 'Histogram', 'Pie chart'],
        correctIndex: 2,
        explanation: 'Histograms are used to show the frequency distribution of a continuous variable.'
      }
    ],
    recap: 'Visualization is a powerful tool for both data exploration and storytelling.'
  },
  'ai-feature-engineering': {
    id: 'ai-feature-engineering',
    title: 'Feature Engineering',
    todayYouAreLearning: 'How to create new features and transform existing ones to improve model performance.',
    whyItMatters: 'The right features can make a simple model perform better than a complex one with poor features.',
    explanation: 'Feature engineering is the process of using domain knowledge to create features that make machine learning algorithms work better. This includes techniques like "one-hot encoding" for categorical data and "scaling" for numerical data.',
    analogy: 'It\'s like choosing the best ingredients for a recipe.',
    codeExample: '# One-hot encoding\npd.get_dummies(df, columns=["color"])',
    lineByLine: 'We use Pandas to convert a categorical "color" column into multiple binary columns (e.g., color_red, color_blue).',
    commonMistakes: ['Creating too many features (overfitting)', 'Not scaling features when needed', 'Ignoring the relationship between features'],
    practice: 'Convert a categorical variable into numerical values using one-hot encoding.',
    challenge: 'Explain the difference between "Normalization" and "Standardization".',
    quiz: [
      {
        question: 'What is the goal of feature engineering?',
        options: ['To make the data smaller', 'To create better inputs for the model', 'To replace the model', 'To hide the data'],
        correctIndex: 1,
        explanation: 'Feature engineering aims to provide the model with more informative and useful inputs.'
      }
    ],
    recap: 'Feature engineering is an art that can significantly boost your model\'s accuracy.'
  },
  'ai-ml-supervised': {
    id: 'ai-ml-supervised',
    title: 'Supervised Learning',
    todayYouAreLearning: 'Regression, classification, and learning from labeled data.',
    whyItMatters: 'Supervised learning is the most common type of machine learning used in real-world applications.',
    explanation: 'In supervised learning, the model is trained on a dataset that includes both the input data and the correct output (labels). The goal is for the model to learn the mapping from inputs to outputs so it can predict labels for new data.',
    analogy: 'It\'s like a student learning with an answer key.',
    codeExample: 'from sklearn.linear_model import LinearRegression\n\nmodel = LinearRegression()\nmodel.fit(X_train, y_train)\npredictions = model.predict(X_test)',
    lineByLine: 'We import a linear regression model. We "train" it on our labeled data. Then we use it to make predictions on new data.',
    commonMistakes: ['Using a regression model for classification', 'Not splitting data into training and testing sets', 'Overfitting the training data'],
    practice: 'Train a simple classification model to identify spam emails.',
    challenge: 'Explain the difference between "Linear Regression" and "Logistic Regression".',
    quiz: [
      {
        question: 'What is the main characteristic of supervised learning?',
        options: ['The data is unlabeled', 'The data is labeled with correct answers', 'The model learns by trial and error', 'No data is used'],
        correctIndex: 1,
        explanation: 'Supervised learning relies on labeled data to guide the learning process.'
      }
    ],
    recap: 'Supervised learning is the foundation for many AI tasks like prediction and categorization.'
  },
  'ai-ml-unsupervised': {
    id: 'ai-ml-unsupervised',
    title: 'Unsupervised Learning',
    todayYouAreLearning: 'Clustering, dimensionality reduction, and finding hidden patterns.',
    whyItMatters: 'Unsupervised learning allows you to find structure in data when you don\'t have labels.',
    explanation: 'In unsupervised learning, the model is given data without any labels. It must find inherent patterns or groupings on its own. Common tasks include clustering (grouping similar items) and dimensionality reduction (simplifying complex data).',
    analogy: 'It\'s like sorting a pile of mixed coins without knowing their names.',
    codeExample: 'from sklearn.cluster import KMeans\n\nkmeans = KMeans(n_clusters=3)\nkmeans.fit(data)\nclusters = kmeans.predict(data)',
    lineByLine: 'We import the K-Means algorithm. We tell it to find 3 clusters in our unlabeled data. Then we assign each data point to a cluster.',
    commonMistakes: ['Assuming the clusters always have a clear meaning', 'Choosing the wrong number of clusters', 'Not scaling data before clustering'],
    practice: 'Perform K-Means clustering on a dataset of customer purchase history.',
    challenge: 'Explain how "Principal Component Analysis" (PCA) can be used for dimensionality reduction.',
    quiz: [
      {
        question: 'Which of these is an unsupervised learning task?',
        options: ['Predicting house prices', 'Identifying spam', 'Customer segmentation', 'Handwriting recognition'],
        correctIndex: 2,
        explanation: 'Customer segmentation involves grouping similar customers without pre-defined labels.'
      }
    ],
    recap: 'Unsupervised learning is a powerful tool for discovering hidden structures in your data.'
  },
  'ai-ml-evaluation': {
    id: 'ai-ml-evaluation',
    title: 'Model Evaluation',
    todayYouAreLearning: 'Metrics like accuracy, precision, recall, and how to tell if your model is actually good.',
    whyItMatters: 'You can\'t improve what you can\'t measure. Evaluation tells you how reliable your model\'s predictions are.',
    explanation: 'Evaluation involves using a separate "test set" to see how well your model performs on data it hasn\'t seen before. We use different metrics depending on the task (e.g., accuracy for balanced classification, RMSE for regression).',
    analogy: 'It\'s like a final exam for the model.',
    codeExample: 'from sklearn.metrics import accuracy_score\n\nacc = accuracy_score(y_test, predictions)\nprint(f"Accuracy: {acc}")',
    lineByLine: 'We import the accuracy metric. We compare the model\'s predictions to the true labels in the test set. We print the result.',
    commonMistakes: ['Evaluating on the training data', 'Relying only on accuracy for imbalanced data', 'Ignoring the "Confusion Matrix"'],
    practice: 'Calculate the precision and recall for a classification model.',
    challenge: 'Explain the "Bias-Variance Trade-off" and how it relates to model performance.',
    quiz: [
      {
        question: 'Which metric is best for a regression problem?',
        options: ['Accuracy', 'Precision', 'Mean Squared Error (MSE)', 'F1-Score'],
        correctIndex: 2,
        explanation: 'MSE measures the average squared difference between predicted and actual values in regression.'
      }
    ],
    recap: 'Proper evaluation is the only way to ensure your AI model is ready for the real world.'
  },
  'ai-dl-neural-networks': {
    id: 'ai-dl-neural-networks',
    title: 'Neural Networks',
    todayYouAreLearning: 'The building blocks of deep learning: neurons, layers, and activation functions.',
    whyItMatters: 'Neural networks are the foundation of modern AI breakthroughs in image recognition, translation, and more.',
    explanation: 'A neural network is a computational model inspired by the human brain. It consists of layers of "neurons" that process information. Each connection has a "weight" that is adjusted during training to minimize errors.',
    analogy: 'A neural network is like a team of people passing messages, where each person decides how important the message is.',
    codeExample: 'import tensorflow as tf\n\nmodel = tf.keras.Sequential([\n  tf.keras.layers.Dense(10, activation="relu"),\n  tf.keras.layers.Dense(1, activation="sigmoid")\n])',
    lineByLine: 'We import TensorFlow. We create a simple network with one hidden layer of 10 neurons and one output layer.',
    commonMistakes: ['Using too many layers for a simple problem', 'Choosing the wrong activation function', 'Not normalizing input data'],
    practice: 'Build a simple neural network to solve a basic classification problem.',
    challenge: 'Explain the "Vanishing Gradient" problem and how ReLU helps solve it.',
    quiz: [
      {
        question: 'What is a "Hidden Layer" in a neural network?',
        options: ['A layer that is invisible', 'A layer between the input and output layers', 'A layer that stores secrets', 'The last layer of the network'],
        correctIndex: 1,
        explanation: 'Hidden layers perform the complex transformations that allow the network to learn patterns.'
      }
    ],
    recap: 'Neural networks are powerful tools that can learn complex patterns from data.'
  },
  'ai-dl-cnn': {
    id: 'ai-dl-cnn',
    title: 'Convolutional Neural Networks (CNNs)',
    todayYouAreLearning: 'How CNNs use filters to "see" and understand images.',
    whyItMatters: 'CNNs are the gold standard for computer vision tasks like facial recognition and self-driving cars.',
    explanation: 'CNNs are designed to process grid-like data, like images. They use "convolutional layers" with filters that slide over the image to detect features like edges, shapes, and eventually complex objects.',
    analogy: 'A CNN is like a person looking at a picture through a small magnifying glass, moving it around to find specific details.',
    codeExample: 'model.add(tf.keras.layers.Conv2D(32, (3, 3), activation="relu"))\nmodel.add(tf.keras.layers.MaxPooling2D((2, 2)))',
    lineByLine: 'We add a convolutional layer with 32 filters. Then we add a "pooling" layer to simplify the information and reduce computation.',
    commonMistakes: ['Using a CNN for non-image data', 'Not using enough filters', 'Ignoring the importance of data augmentation'],
    practice: 'Train a simple CNN to recognize handwritten digits (MNIST dataset).',
    challenge: 'Explain the concept of "Transfer Learning" and why it\'s so useful in computer vision.',
    quiz: [
      {
        question: 'What is the primary purpose of a "Filter" in a CNN?',
        options: ['To blur the image', 'To detect specific features like edges', 'To resize the image', 'To change the colors'],
        correctIndex: 1,
        explanation: 'Filters (or kernels) are used to extract features from the input image.'
      }
    ],
    recap: 'CNNs have revolutionized how computers understand visual information.'
  },
  'ai-dl-rnn': {
    id: 'ai-dl-rnn',
    title: 'Recurrent Neural Networks (RNNs)',
    todayYouAreLearning: 'How RNNs handle sequential data like text, speech, and time-series.',
    whyItMatters: 'RNNs have "memory," making them ideal for tasks where the order of data points matters.',
    explanation: 'Unlike standard networks, RNNs have connections that loop back, allowing them to maintain a "hidden state" that captures information from previous steps in a sequence.',
    analogy: 'An RNN is like reading a sentence—you need to remember the previous words to understand the current one.',
    codeExample: 'model.add(tf.keras.layers.SimpleRNN(32))\n# Or better:\nmodel.add(tf.keras.layers.LSTM(32))',
    lineByLine: 'We add an RNN layer. We also mention LSTM, a more advanced type of RNN that is better at remembering long sequences.',
    commonMistakes: ['Using a standard RNN for very long sequences', 'Not padding sequences to the same length', 'Ignoring the direction of the sequence'],
    practice: 'Build a simple RNN for sentiment analysis of text.',
    challenge: 'Explain the difference between a standard RNN and an LSTM (Long Short-Term Memory) network.',
    quiz: [
      {
        question: 'What makes RNNs different from standard neural networks?',
        options: ['They are faster', 'They have a "memory" of previous inputs', 'They only work with images', 'They don\'t use weights'],
        correctIndex: 1,
        explanation: 'The recurrent connections in RNNs allow them to process sequential information.'
      }
    ],
    recap: 'RNNs are essential for any task involving sequences or time-series data.'
  },
  'ai-models-nlp': {
    id: 'ai-models-nlp',
    title: 'Natural Language Processing (NLP)',
    todayYouAreLearning: 'How computers understand, interpret, and generate human language.',
    whyItMatters: 'NLP powers everything from Google Translate to Siri and Alexa.',
    explanation: 'NLP combines AI and linguistics to process text and speech. Key tasks include tokenization (splitting text into words), sentiment analysis, and machine translation.',
    analogy: 'It\'s like teaching a computer to read, write, and speak our language.',
    codeExample: 'from textblob import TextBlob\n\ntext = "MentorStack is amazing!"\nsentiment = TextBlob(text).sentiment.polarity',
    lineByLine: 'We use a simple NLP library to analyze a sentence and get a "sentiment score" (positive or negative).',
    commonMistakes: ['Ignoring the context of words', 'Not handling slang or sarcasm', 'Using poor quality training data'],
    practice: 'Use a pre-trained model to perform sentiment analysis on a few tweets.',
    challenge: 'Explain the concept of "Word Embeddings" (like Word2Vec) and how they represent meaning.',
    quiz: [
      {
        question: 'What does "Tokenization" mean in NLP?',
        options: ['Encrypting text', 'Splitting text into smaller units like words', 'Translating text', 'Summarizing text'],
        correctIndex: 1,
        explanation: 'Tokenization is the first step in most NLP pipelines, breaking down text into manageable pieces.'
      }
    ],
    recap: 'NLP is the key to building machines that can truly communicate with humans.'
  },
  'ai-models-cv': {
    id: 'ai-models-cv',
    title: 'Computer Vision (CV)',
    todayYouAreLearning: 'Advanced applications of CV like object detection and image segmentation.',
    whyItMatters: 'CV is the "eyes" of AI, enabling self-driving cars, medical diagnosis, and more.',
    explanation: 'Beyond simple classification, advanced CV involves finding where objects are (detection) and identifying the exact pixels of an object (segmentation).',
    analogy: 'It\'s like giving a robot the ability to not just see a car, but to know exactly where it is and how big it is.',
    codeExample: '# Conceptual: Object Detection\nboxes, scores, classes = model.detect(image)',
    lineByLine: 'A detection model returns the "bounding boxes" around objects, the confidence scores, and the class labels.',
    commonMistakes: ['Assuming a model works in all lighting conditions', 'Not considering the speed of the model (latency)', 'Ignoring the ethical implications of facial recognition'],
    practice: 'Use a pre-trained object detection model (like YOLO) to find objects in a photo.',
    challenge: 'Explain the difference between "Object Detection" and "Instance Segmentation".',
    quiz: [
      {
        question: 'Which task involves identifying every pixel belonging to an object?',
        options: ['Classification', 'Detection', 'Segmentation', 'Localization'],
        correctIndex: 2,
        explanation: 'Segmentation is the most detailed CV task, providing pixel-level understanding.'
      }
    ],
    recap: 'Computer Vision is transforming how machines perceive and interact with the world.'
  },
  'ai-models-llms': {
    id: 'ai-models-llms',
    title: 'Large Language Models (LLMs)',
    todayYouAreLearning: 'The power of Transformers, Attention, and models like GPT-4.',
    whyItMatters: 'LLMs are the current frontier of AI, capable of reasoning, coding, and creative writing.',
    explanation: 'LLMs are massive models trained on almost all the text on the internet. They use the "Transformer" architecture and "Attention" mechanisms to understand the context and relationships between words over long distances.',
    analogy: 'An LLM is like a person who has read every book in the world and can answer almost any question.',
    codeExample: '# Conceptual: Prompting an LLM\nresponse = llm.generate("Explain quantum physics to a 5-year-old")',
    lineByLine: 'We send a "prompt" to the model, and it generates a coherent, context-aware response.',
    commonMistakes: ['Trusting LLM outputs blindly (hallucinations)', 'Using poor prompts', 'Ignoring the cost and energy usage of these models'],
    practice: 'Experiment with different prompts to see how an LLM\'s response changes.',
    challenge: 'Explain the concept of "Self-Attention" and why it was a breakthrough for NLP.',
    quiz: [
      {
        question: 'What is the core architecture used by most modern LLMs?',
        options: ['CNN', 'RNN', 'Transformer', 'Decision Tree'],
        correctIndex: 2,
        explanation: 'The Transformer architecture, introduced in 2017, is the foundation for almost all current LLMs.'
      }
    ],
    recap: 'LLMs are the most powerful AI models ever built, and they are changing everything.'
  },
  'cyber-intro': {
    id: 'cyber-intro',
    title: 'Intro to Cybersecurity',
    todayYouAreLearning: 'The core principles of cybersecurity: Confidentiality, Integrity, and Availability (the CIA triad).',
    whyItMatters: 'In a digital world, protecting information is as important as protecting physical property. Cybersecurity is the defense against digital attacks.',
    explanation: 'Cybersecurity is the practice of protecting systems, networks, and programs from digital attacks. These attacks are usually aimed at accessing, changing, or destroying sensitive information; extorting money from users; or interrupting normal business processes.',
    analogy: 'Cybersecurity is like the security system for your house. It includes locks on the doors (passwords), an alarm system (firewalls), and a safe for your valuables (encryption).',
    codeExample: '# The CIA Triad\n1. Confidentiality: Only authorized users can access data.\n2. Integrity: Data remains accurate and untampered.\n3. Availability: Systems are accessible when needed.',
    lineByLine: 'These are the three pillars of security. Every security measure aims to protect at least one of these.',
    commonMistakes: ['Thinking security is only about passwords', 'Ignoring the human element (social engineering)', 'Assuming a system is 100% secure'],
    practice: 'Identify one example of a breach of Confidentiality, Integrity, and Availability from recent news.',
    challenge: 'Explain how a "Denial of Service" (DoS) attack specifically targets the "Availability" part of the CIA triad.',
    quiz: [
      {
        question: 'What does the "I" in the CIA triad stand for?',
        options: ['Information', 'Integrity', 'Identification', 'Internet'],
        correctIndex: 1,
        explanation: 'Integrity ensures that data is accurate and has not been modified by unauthorized parties.'
      }
    ],
    recap: 'Cybersecurity is a continuous process of managing risk and protecting digital assets.'
  },
  'cyber-threats': {
    id: 'cyber-threats',
    title: 'Threats & Vulnerabilities',
    todayYouAreLearning: 'The difference between a threat, a vulnerability, and a risk, and common types of malware.',
    whyItMatters: 'To defend against attacks, you must first understand the tools and methods attackers use.',
    explanation: 'A vulnerability is a weakness in a system. A threat is a potential danger that could exploit that weakness. Risk is the likelihood of a threat exploiting a vulnerability. Malware (malicious software) includes viruses, worms, trojans, and ransomware.',
    analogy: 'A vulnerability is an unlocked window. A threat is a burglar. Risk is the chance that a burglar will find the unlocked window and enter your house.',
    codeExample: '// Common Malware Types\n- Virus: Attaches to files and spreads.\n- Worm: Spreads automatically across networks.\n- Trojan: Disguises itself as legitimate software.\n- Ransomware: Encrypts files and demands payment.',
    lineByLine: 'These are the most common digital "diseases" you\'ll encounter in cybersecurity.',
    commonMistakes: ['Using "virus" as a catch-all term for all malware', 'Thinking Mac or Linux systems are immune to malware', 'Not keeping software updated (which fixes vulnerabilities)'],
    practice: 'Research a famous malware attack (like WannaCry) and identify its type.',
    challenge: 'Explain the difference between a "Zero-Day" vulnerability and a known vulnerability.',
    quiz: [
      {
        question: 'What is a "Trojan" in cybersecurity?',
        options: ['A fast-spreading virus', 'Malware disguised as useful software', 'A type of firewall', 'A secure password'],
        correctIndex: 1,
        explanation: 'Like the Trojan Horse of myth, this malware tricks users into running it by appearing harmless.'
      }
    ],
    recap: 'Understanding the landscape of threats is the first step in building effective defenses.'
  },
  'cyber-networking-basics': {
    id: 'cyber-networking-basics',
    title: 'Networking for Security',
    todayYouAreLearning: 'How data travels across networks and the importance of IP addresses, ports, and protocols.',
    whyItMatters: 'Most cyberattacks happen over a network. You can\'t secure what you don\'t understand.',
    explanation: 'Networking is the backbone of the internet. Data is broken into "packets" and sent using protocols like TCP/IP. Every device has an IP address, and services run on specific "ports" (e.g., web traffic on port 80 or 443).',
    analogy: 'A network is like a postal system. The IP address is the house address, the port is the specific door or window, and the protocol is the language used on the envelope.',
    codeExample: '# Common Ports\n80: HTTP (Unencrypted Web)\n443: HTTPS (Encrypted Web)\n22: SSH (Secure Remote Access)\n21: FTP (File Transfer)',
    lineByLine: 'Knowing these ports is essential for identifying which services are running on a system.',
    commonMistakes: ['Thinking all network traffic is encrypted', 'Ignoring "uncommon" ports that might be open', 'Not understanding the difference between a public and private IP'],
    practice: 'Use the "ping" command in your terminal to check the connectivity to a website.',
    challenge: 'Explain the "Three-Way Handshake" used by the TCP protocol to establish a connection.',
    quiz: [
      {
        question: 'Which port is used for secure web traffic (HTTPS)?',
        options: ['80', '21', '443', '22'],
        correctIndex: 2,
        explanation: 'Port 443 is the standard port for encrypted web traffic using SSL/TLS.'
      }
    ],
    recap: 'Networking knowledge is the foundation for understanding how attacks spread and how to block them.'
  },
  'cyber-linux-fundamentals': {
    id: 'cyber-linux-fundamentals',
    title: 'Linux for Security',
    todayYouAreLearning: 'Why Linux is the preferred OS for security professionals and basic command-line skills.',
    whyItMatters: 'Most servers and security tools run on Linux. Mastering the command line is a superpower in cybersecurity.',
    explanation: 'Linux is an open-source operating system. It provides granular control over the system, which is essential for both attackers (to exploit) and defenders (to secure). The terminal (CLI) is where most security work happens.',
    analogy: 'If Windows is like a pre-built house, Linux is like a set of high-quality tools and materials that let you build exactly what you need.',
    codeExample: 'ls -la # List all files with details\nwhoami # Show current user\nsudo apt update # Update software packages',
    lineByLine: 'These are basic commands for navigating the file system, checking permissions, and managing software.',
    commonMistakes: ['Running commands as "root" (admin) when not necessary', 'Forgetting that Linux is case-sensitive', 'Not reading the manual (man pages) for commands'],
    practice: 'Open a Linux terminal (or WSL) and create a new directory and a file inside it.',
    challenge: 'Explain what the "chmod" command does and what "chmod 777" means (and why it\'s dangerous).',
    quiz: [
      {
        question: 'What does the "sudo" command do?',
        options: ['Deletes a file', 'Runs a command with administrative privileges', 'Restarts the computer', 'Changes the user password'],
        correctIndex: 1,
        explanation: '"sudo" stands for "superuser do," allowing a user to perform tasks that require root access.'
      }
    ],
    recap: 'Linux is the primary environment for cybersecurity. Learning its command line is non-negotiable.'
  },
  'cyber-cryptography-basics': {
    id: 'cyber-cryptography-basics',
    title: 'Cryptography Basics',
    todayYouAreLearning: 'The difference between symmetric and asymmetric encryption and the role of hashing.',
    whyItMatters: 'Cryptography is the primary tool for ensuring the "Confidentiality" and "Integrity" of data.',
    explanation: 'Encryption scrambles data so only authorized parties can read it. Symmetric uses one key for both encryption and decryption. Asymmetric uses a public key to encrypt and a private key to decrypt. Hashing creates a unique "fingerprint" of data to ensure it hasn\'t been changed.',
    analogy: 'Symmetric is like a shared house key. Asymmetric is like a mailbox where anyone can drop a letter (public key), but only you have the key to open it (private key).',
    codeExample: '# Hashing Example (Conceptual)\n"password123" -> 5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8',
    lineByLine: 'A hash function takes an input and produces a fixed-length string. Even a tiny change in the input results in a completely different hash.',
    commonMistakes: ['Thinking hashing is the same as encryption (hashes cannot be "decrypted")', 'Using weak or outdated encryption algorithms (like DES)', 'Not protecting the private key in asymmetric encryption'],
    practice: 'Use an online tool to generate an MD5 or SHA-256 hash of your name.',
    challenge: 'Explain the concept of a "Digital Signature" and how it uses asymmetric encryption.',
    quiz: [
      {
        question: 'Which type of encryption uses two different keys (public and private)?',
        options: ['Symmetric', 'Asymmetric', 'Hashing', 'Encoding'],
        correctIndex: 1,
        explanation: 'Asymmetric (or Public Key) cryptography uses a pair of related keys for secure communication.'
      }
    ],
    recap: 'Cryptography is the math-based shield that protects our data from prying eyes and tampering.'
  },
  'cyber-web-security': {
    id: 'cyber-web-security',
    title: 'Web Application Security',
    todayYouAreLearning: 'Common web vulnerabilities like SQL Injection and Cross-Site Scripting (XSS).',
    whyItMatters: 'Web apps are the most exposed part of an organization. Most breaches start with a web vulnerability.',
    explanation: 'Web security involves protecting websites and online services. SQL Injection happens when an attacker "injects" malicious SQL code into an input field to steal data. XSS happens when an attacker injects malicious scripts into a webpage viewed by other users.',
    analogy: 'SQL Injection is like tricking a bank teller into giving you someone else\'s money by writing a fake note on the back of a check.',
    codeExample: '-- SQL Injection Example\nSELECT * FROM users WHERE username = \'admin\' OR \'1\'=\'1\';',
    lineByLine: 'The OR \'1\'=\'1\' part is always true, which might trick the database into logging the attacker in without a password.',
    commonMistakes: ['Trusting user input without "sanitizing" it', 'Not using HTTPS', 'Leaving default passwords on admin panels'],
    practice: 'Research the "OWASP Top 10" list of web security risks.',
    challenge: 'Explain how "Parameterized Queries" (or Prepared Statements) prevent SQL Injection.',
    quiz: [
      {
        question: 'What is "XSS" (Cross-Site Scripting)?',
        options: ['Stealing a database', 'Injecting malicious scripts into a webpage', 'A type of firewall', 'A way to speed up a website'],
        correctIndex: 1,
        explanation: 'XSS allows attackers to execute scripts in the victim\'s browser, often to steal session cookies.'
      }
    ],
    recap: 'Web security is about never trusting user input and always assuming the client-side is compromised.'
  },
  'cyber-identity-access': {
    id: 'cyber-identity-access',
    title: 'Identity & Access Management (IAM)',
    todayYouAreLearning: 'Authentication, Authorization, and the importance of Multi-Factor Authentication (MFA).',
    whyItMatters: 'IAM is the gatekeeper. If an attacker can steal an identity, they can bypass almost all other security measures.',
    explanation: 'Authentication is proving who you are (e.g., password). Authorization is what you are allowed to do (e.g., read-only access). MFA adds an extra layer of security by requiring two or more pieces of evidence to log in.',
    analogy: 'Authentication is showing your ID at the door. Authorization is being given a key that only opens specific rooms in the building.',
    codeExample: '// IAM Principles\n- Least Privilege: Give only the minimum access needed.\n- Separation of Duties: Don\'t give one person too much power.\n- MFA: Use something you know + something you have.',
    lineByLine: 'These principles ensure that even if one account is compromised, the damage is limited.',
    commonMistakes: ['Using the same password for multiple accounts', 'Giving everyone "Admin" access to save time', 'Not disabling accounts when employees leave'],
    practice: 'Enable Multi-Factor Authentication (MFA) on your most important personal accounts.',
    challenge: 'Explain the difference between "Role-Based Access Control" (RBAC) and "Attribute-Based Access Control" (ABAC).',
    quiz: [
      {
        question: 'What is the "Principle of Least Privilege"?',
        options: ['Giving everyone full access', 'Giving users only the access they need for their job', 'Having no passwords', 'Allowing everyone to be an admin'],
        correctIndex: 1,
        explanation: 'Least privilege minimizes the potential damage from a compromised account or insider threat.'
      }
    ],
    recap: 'Strong identity management is the first line of defense in any security strategy.'
  },
  'cyber-incident-response': {
    id: 'cyber-incident-response',
    title: 'Incident Response & Recovery',
    todayYouAreLearning: 'The steps to take when a security breach occurs and how to recover data.',
    whyItMatters: 'It\'s not a matter of "if," but "when." Being prepared for a breach can save a company from total disaster.',
    explanation: 'Incident Response (IR) is the organized approach to managing a security breach. The goals are to limit damage, remove the threat, and restore systems. Recovery involves bringing systems back online and learning from the incident.',
    analogy: 'Incident Response is like a fire drill. You need a plan and practice so everyone knows what to do when the alarm goes off.',
    codeExample: '// IR Steps\n1. Preparation\n2. Identification\n3. Containment\n4. Eradication\n5. Recovery\n6. Lessons Learned',
    lineByLine: 'Following these steps ensures that the response is calm, effective, and thorough.',
    commonMistakes: ['Panicking and deleting evidence', 'Not having a backup of critical data', 'Thinking the job is done once the threat is removed (forgetting "Lessons Learned")'],
    practice: 'Create a simple personal incident response plan for what you would do if your email was hacked.',
    challenge: 'Explain the importance of "Digital Forensics" in the incident response process.',
    quiz: [
      {
        question: 'What is the first step in the Incident Response process?',
        options: ['Containment', 'Recovery', 'Preparation', 'Eradication'],
        correctIndex: 2,
        explanation: 'Preparation is key—you must have the tools and plans in place before an incident happens.'
      }
    ],
    recap: 'A fast and effective response is what separates a minor incident from a catastrophic breach.'
  },
  'cyber-ethical-hacking': {
    id: 'cyber-ethical-hacking',
    title: 'Ethical Hacking & Pentesting',
    todayYouAreLearning: 'The mindset of an ethical hacker and the phases of a penetration test.',
    whyItMatters: 'To catch a thief, you must think like one. Ethical hackers find weaknesses before the bad guys do.',
    explanation: 'Ethical hacking (or penetration testing) is the authorized attempt to gain unauthorized access to a system. It follows a strict process: Reconnaissance, Scanning, Gaining Access, Maintaining Access, and Reporting.',
    analogy: 'An ethical hacker is like a security consultant hired to try and break into a bank to find where the security is weak.',
    codeExample: '# Pentesting Phases\n1. Recon: Gathering info\n2. Scanning: Finding open ports/vulnerabilities\n3. Exploitation: Gaining access\n4. Post-Exploitation: Seeing what else can be done\n5. Reporting: Documenting findings',
    lineByLine: 'Each phase is critical for a thorough and professional security assessment.',
    commonMistakes: ['Hacking without written permission (this is illegal!)', 'Not documenting the steps taken', 'Causing a system crash during testing'],
    practice: 'Explore a "Capture The Flag" (CTF) platform like TryHackMe or HackTheBox.',
    challenge: 'Explain the difference between "White Box," "Black Box," and "Grey Box" testing.',
    quiz: [
      {
        question: 'What is the main goal of an ethical hacker?',
        options: ['To steal money', 'To find and report vulnerabilities before they are exploited', 'To break the internet', 'To show off their skills'],
        correctIndex: 1,
        explanation: 'Ethical hackers use their skills for good, helping organizations improve their security.'
      }
    ],
    recap: 'Ethical hacking is a vital tool for proactively securing systems and staying ahead of attackers.'
  },
  'devops-intro': {
    id: 'devops-intro',
    title: 'Intro to DevOps',
    todayYouAreLearning: 'The philosophy of DevOps and how it bridges the gap between development and operations.',
    whyItMatters: 'DevOps is about speed and reliability. It allows companies to ship software faster and with fewer errors.',
    explanation: 'DevOps is a set of practices that combines software development (Dev) and IT operations (Ops). It aims to shorten the systems development life cycle and provide continuous delivery with high software quality.',
    analogy: 'DevOps is like a pit crew in a race. They work together to get the car back on the track as fast as possible, ensuring everything is perfect.',
    codeExample: '// The DevOps Lifecycle\n1. Plan\n2. Code\n3. Build\n4. Test\n5. Release\n6. Deploy\n7. Operate\n8. Monitor',
    lineByLine: 'This cycle repeats constantly, ensuring continuous improvement and delivery.',
    commonMistakes: ['Thinking DevOps is just a set of tools', 'Ignoring the cultural shift needed', 'Not automating enough'],
    practice: 'Research the "Three Ways" of DevOps.',
    challenge: 'Explain the difference between Continuous Integration (CI) and Continuous Deployment (CD).',
    quiz: [
      {
        question: 'What is the main goal of DevOps?',
        options: ['To separate Dev and Ops', 'To speed up software delivery and improve quality', 'To replace developers with robots', 'To make software more expensive'],
        correctIndex: 1,
        explanation: 'DevOps focuses on collaboration and automation to deliver value faster.'
      }
    ],
    recap: 'DevOps is a culture and a set of practices that revolutionizes how software is built and delivered.'
  },
  'cloud-intro': {
    id: 'cloud-intro',
    title: 'Intro to Cloud Computing',
    todayYouAreLearning: 'What the cloud is and the different service models (IaaS, PaaS, SaaS).',
    whyItMatters: 'The cloud is where modern software lives. It provides on-demand access to computing resources without the need for physical hardware.',
    explanation: 'Cloud computing is the on-demand delivery of IT resources over the internet with pay-as-you-go pricing. Instead of buying and maintaining physical data centers, you can access technology services like computing power, storage, and databases from providers like AWS, Azure, or Google Cloud.',
    analogy: 'The cloud is like a utility company (like electricity). You don\'t build your own power plant; you just plug in and pay for what you use.',
    codeExample: '// Cloud Service Models\n- IaaS: Infrastructure (Servers, Storage)\n- PaaS: Platform (Tools for building apps)\n- SaaS: Software (Ready-to-use apps like Gmail)',
    lineByLine: 'These models represent different levels of control and responsibility.',
    commonMistakes: ['Thinking the cloud is just "someone else\'s computer"', 'Ignoring cloud costs', 'Not securing cloud resources properly'],
    practice: 'Identify one example of an IaaS, PaaS, and SaaS provider.',
    challenge: 'Explain the "Shared Responsibility Model" in cloud computing.',
    quiz: [
      {
        question: 'What does "SaaS" stand for?',
        options: ['Servers as a Service', 'Software as a Service', 'Storage as a Service', 'System as a Service'],
        correctIndex: 1,
        explanation: 'SaaS provides ready-to-use software applications over the internet.'
      }
    ],
    recap: 'Cloud computing provides the scalability and flexibility needed for modern applications.'
  },
  'game-dev-intro': {
    id: 'game-dev-intro',
    title: 'Intro to Game Development',
    todayYouAreLearning: 'The game development lifecycle and the role of game engines.',
    whyItMatters: 'Game development is a unique blend of art, science, and storytelling. It\'s one of the most exciting fields in tech.',
    explanation: 'Game development is the process of creating video games. It involves game design, programming, art creation, and sound engineering. Game engines like Unity or Unreal provide the tools to build games more efficiently.',
    analogy: 'A game engine is like a film studio. It provides the cameras, lights, and sets so you can focus on directing the actors and telling the story.',
    codeExample: '// Simple Game Loop\nwhile (gameRunning) {\n  processInput();\n  updateGameWorld();\n  renderGraphics();\n}',
    lineByLine: 'This loop runs dozens of times per second, ensuring the game responds to the player and looks smooth.',
    commonMistakes: ['Starting with a project that is too big', 'Ignoring game performance', 'Not testing enough with real players'],
    practice: 'Download Unity or Unreal Engine and explore the interface.',
    challenge: 'Explain the role of a "Game Designer" vs. a "Game Programmer".',
    quiz: [
      {
        question: 'What is a "Game Engine"?',
        options: ['The physical computer a game runs on', 'A software framework for building games', 'The main character in a game', 'A type of graphics card'],
        correctIndex: 1,
        explanation: 'Game engines provide the core functionality (physics, rendering, input) needed to build games.'
      }
    ],
    recap: 'Game development is a complex but rewarding field that combines creativity and technical skill.'
  },
  'devops-linux-basics': {
    id: 'devops-linux-basics',
    title: 'Linux for DevOps',
    todayYouAreLearning: 'Essential Linux commands for server management and automation.',
    whyItMatters: 'Almost all DevOps tools and servers run on Linux. It is the native environment for DevOps.',
    explanation: 'Linux is the foundation of the modern web. DevOps engineers use it to manage servers, run containers, and automate deployments. Understanding the file system, permissions, and basic shell scripting is essential.',
    analogy: 'Linux is the engine room of a ship. You need to know how to navigate it to keep the ship moving.',
    codeExample: 'ssh user@server # Connect to a remote server\ntop # Monitor system resources\nchmod +x script.sh # Make a script executable',
    lineByLine: 'These commands are used daily by DevOps engineers to manage and monitor systems.',
    commonMistakes: ['Not using SSH keys for security', 'Hardcoding passwords in scripts', 'Not checking log files when things go wrong'],
    practice: 'Write a simple bash script that prints "Hello, DevOps!" and run it.',
    challenge: 'Explain the difference between a "Process" and a "Service" in Linux.',
    quiz: [
      {
        question: 'Which command is used to see the current running processes?',
        options: ['ls', 'top', 'cd', 'mkdir'],
        correctIndex: 1,
        explanation: 'The "top" command (or "htop") provides a real-time view of system processes.'
      }
    ],
    recap: 'Linux mastery is a core requirement for any successful DevOps engineer.'
  },
  'cloud-aws-basics': {
    id: 'cloud-aws-basics',
    title: 'AWS Fundamentals',
    todayYouAreLearning: 'The core services of Amazon Web Services (AWS) like EC2, S3, and RDS.',
    whyItMatters: 'AWS is the world\'s most widely used cloud platform. Knowing its basics is a huge career advantage.',
    explanation: 'AWS offers hundreds of services. EC2 provides virtual servers, S3 provides object storage (like a giant hard drive in the sky), and RDS provides managed databases.',
    analogy: 'AWS is like a giant LEGO set. You can pick and choose the pieces you need to build anything from a small blog to a global social network.',
    codeExample: '// Core AWS Services\n- EC2: Virtual Servers\n- S3: Storage\n- RDS: Databases\n- Lambda: Serverless Functions',
    lineByLine: 'These are the "building blocks" of most AWS architectures.',
    commonMistakes: ['Leaving an S3 bucket public by accident', 'Not setting up billing alerts', 'Using the "Root" account for daily tasks'],
    practice: 'Create a free AWS account and explore the Management Console.',
    challenge: 'Explain the difference between "Region" and "Availability Zone" in AWS.',
    quiz: [
      {
        question: 'Which AWS service provides virtual servers?',
        options: ['S3', 'RDS', 'EC2', 'Lambda'],
        correctIndex: 2,
        explanation: 'EC2 (Elastic Compute Cloud) allows you to launch and manage virtual servers in the cloud.'
      }
    ],
    recap: 'AWS is a vast and powerful platform. Mastering its core services is the key to cloud success.'
  },
  'game-dev-csharp-basics': {
    id: 'game-dev-csharp-basics',
    title: 'C# for Unity',
    todayYouAreLearning: 'The basics of C# programming specifically for use in the Unity game engine.',
    whyItMatters: 'C# is the primary language for Unity. It\'s how you give your game its logic and behavior.',
    explanation: 'C# is a modern, object-oriented language. In Unity, we write "Scripts" that attach to "GameObjects" to control how they move, interact, and respond to the player.',
    analogy: 'If a GameObject is a puppet, a C# script is the strings that make it move.',
    codeExample: 'using UnityEngine;\n\npublic class PlayerController : MonoBehaviour {\n  void Update() {\n    if (Input.GetKeyDown(KeyCode.Space)) {\n      Debug.Log("Jump!");\n    }\n  }\n}',
    lineByLine: 'This script checks every frame if the space bar is pressed. If it is, it prints "Jump!" to the console.',
    commonMistakes: ['Forgetting to attach the script to a GameObject', 'Using expensive operations in the Update() function', 'Not using the Unity API correctly'],
    practice: 'Create a simple C# script in Unity that moves an object when the arrow keys are pressed.',
    challenge: 'Explain the difference between the Start() and Update() functions in Unity.',
    quiz: [
      {
        question: 'Which language is primarily used for scripting in Unity?',
        options: ['C++', 'Python', 'C#', 'JavaScript'],
        correctIndex: 2,
        explanation: 'C# is the standard language for Unity development.'
      }
    ],
    recap: 'C# is the brain of your Unity games. Learning it well is essential for creating complex gameplay.'
  },
  // LEVEL 1: FOUNDATION
  'ui-vs-ux': {
    id: 'ui-vs-ux',
    title: 'UI vs UX: What\'s the Difference?',
    todayYouAreLearning: 'The fundamental difference between User Interface (UI) and User Experience (UX).',
    whyItMatters: 'Understanding these two roles is the first step to becoming a professional designer. They work together but focus on different things.',
    explanation: 'UX (User Experience) is the internal experience that a person has as they interact with every aspect of a company’s products and services. It focuses on the "why" and "how" of a product. UI (User Interface) is the series of screens, pages, and visual elements—like buttons and icons—that enable a person to interact with a product or service. It focuses on the "look" and "feel".',
    analogy: 'Imagine a house. The UX is the blueprint, the flow of the rooms, and how easy it is to live in. The UI is the paint, the furniture, the curtains, and the beautiful decorations.',
    codeExample: '// UI focus: Color and Size\nbutton.style.backgroundColor = "blue";\nbutton.style.borderRadius = "8px";\n\n// UX focus: Logic and Feedback\nbutton.onClick = () => {\n  showLoadingSpinner();\n  saveData();\n};',
    lineByLine: 'UI defines the visual properties (blue, rounded corners). UX defines the interaction flow (click -> loading -> save).',
    commonMistakes: ['Thinking UI is just about making things "pretty"', 'Ignoring UX and focusing only on visuals', 'Confusing the two terms in professional settings'],
    practice: 'Pick an app you use daily. List 3 things that are UI (visuals) and 3 things that are UX (how it works/feels).',
    challenge: 'Explain UI/UX to a 5-year-old using a bicycle as an example.',
    quiz: [
      {
        question: 'Which one focuses on the visual elements like buttons and icons?',
        options: ['UX (User Experience)', 'UI (User Interface)', 'Backend Development', 'Project Management'],
        correctIndex: 1,
        explanation: 'UI is all about the interface—the visual part the user interacts with.'
      },
      {
        question: 'If an app is beautiful but very hard to use, it has:',
        options: ['Good UI, Good UX', 'Bad UI, Good UX', 'Good UI, Bad UX', 'Bad UI, Bad UX'],
        correctIndex: 2,
        explanation: 'Beauty is UI; ease of use is UX. A beautiful but confusing app has good UI but bad UX.'
      }
    ],
    recap: 'UX is the brain and the flow; UI is the face and the skin. You need both for a great product.'
  },
  'why-design-matters': {
    id: 'why-design-matters',
    title: 'Why Design Matters',
    todayYouAreLearning: 'The impact of good design on business, users, and the world.',
    whyItMatters: 'Design isn\'t just art; it\'s a problem-solving tool that can make or break a company.',
    explanation: 'Good design builds trust, increases efficiency, and makes products accessible to everyone. It helps users achieve their goals faster and with less frustration. In business, design-led companies consistently outperform their competitors.',
    analogy: 'Design is like a clear road sign. Without it, you might eventually find your destination, but you\'ll be stressed, lost, and likely to give up. With it, the journey is effortless.',
    codeExample: '/* Bad Design: No hierarchy */\n.text { font-size: 16px; color: black; }\n\n/* Good Design: Clear hierarchy */\n.title { font-size: 24px; font-weight: bold; }\n.subtitle { font-size: 18px; color: #666; }\n.body { font-size: 16px; line-height: 1.5; }',
    lineByLine: 'Good design uses hierarchy (size, weight, color) to guide the user\'s eye to the most important information first.',
    commonMistakes: ['Assuming users will "figure it out"', 'Prioritizing aesthetics over functionality', 'Designing for yourself instead of the user'],
    practice: 'Find a "bad" design in your physical environment (e.g., a confusing door handle or remote control). Take a photo and write down how you would fix it.',
    challenge: 'Can you name a company that succeeded primarily because of its superior design?',
    quiz: [
      {
        question: 'What is the primary goal of good design?',
        options: ['To win awards', 'To make things look expensive', 'To solve problems for users', 'To use as many colors as possible'],
        correctIndex: 2,
        explanation: 'At its core, design is about solving problems and making things work better for people.'
      }
    ],
    recap: 'Design is a powerful tool for communication and problem-solving.'
  },
  'real-world-examples': {
    id: 'real-world-examples',
    title: 'Real-World Design Examples',
    todayYouAreLearning: 'Analyzing successful and unsuccessful designs in the real world.',
    whyItMatters: 'Learning from existing products helps you develop a "designer\'s eye" and avoid common pitfalls.',
    explanation: 'We look at apps like Instagram (UI focus on content), Uber (UX focus on reducing friction), and Airbnb (Trust-based design). We also look at "dark patterns"—designs intended to trick users.',
    analogy: 'Analyzing designs is like a chef tasting different dishes. You learn what ingredients work well together and what leaves a bad taste in the mouth.',
    codeExample: '// Example of a "Dark Pattern" (UX to avoid)\nconst subscribeCheckbox = document.getElementById("newsletter");\nsubscribeCheckbox.checked = true; // Pre-checked to trick users',
    lineByLine: 'Pre-checking a newsletter box is a dark pattern because it tricks users into an action they didn\'t explicitly choose.',
    commonMistakes: ['Copying designs without understanding why they work', 'Ignoring the context in which a product is used', 'Falling for trendy designs that don\'t last'],
    practice: 'Open your 3 favorite apps. Write down one specific thing you love about the design of each.',
    challenge: 'Find an example of a "Dark Pattern" in an app or website you use.',
    quiz: [
      {
        question: 'What is a "Dark Pattern" in design?',
        options: ['A design with a dark color theme', 'A design intended to trick or manipulate users', 'A design that only works at night', 'A very complex design system'],
        correctIndex: 1,
        explanation: 'Dark patterns are deceptive UX techniques used to make users do things they might not want to do.'
      }
    ],
    recap: 'The best designs are often invisible—they just work so well you don\'t notice them.'
  },
  'color-theory-basics': {
    id: 'color-theory-basics',
    title: 'Color Theory for UI',
    todayYouAreLearning: 'How to use color effectively to create mood, hierarchy, and accessibility.',
    whyItMatters: 'Color is one of the first things a user notices. It triggers emotions and guides actions.',
    explanation: 'Color theory involves understanding the color wheel, harmonies (complementary, analogous), and psychology (red for danger, blue for trust). In UI, we also focus on contrast for accessibility.',
    analogy: 'Color is like the seasoning in a meal. Too little and it\'s bland; too much and it\'s overwhelming. The right balance makes everything better.',
    codeExample: ':root {\n  --primary: #3B82F6; /* Trusting Blue */\n  --danger: #EF4444; /* Alert Red */\n  --success: #10B981; /* Positive Green */\n  --text: #1F2937; /* High contrast dark gray */\n}',
    lineByLine: 'We define semantic colors (primary, danger, success) to give meaning to our UI elements.',
    commonMistakes: ['Using too many colors', 'Ignoring color blindness and accessibility', 'Using colors that clash and hurt the eyes'],
    practice: 'Create a color palette for a "Meditation App" using 3 main colors. Why did you choose them?',
    challenge: 'Check the contrast ratio between white text and a light yellow background. Is it accessible?',
    quiz: [
      {
        question: 'Which color is most commonly associated with "Success" or "Go" in UI design?',
        options: ['Red', 'Blue', 'Green', 'Purple'],
        correctIndex: 2,
        explanation: 'Green is universally recognized as a positive, "success" color in interfaces.'
      }
    ],
    recap: 'Use color with purpose. Focus on meaning, mood, and accessibility.'
  },
  'typography-for-ui': {
    id: 'typography-for-ui',
    title: 'Typography for UI',
    todayYouAreLearning: 'Choosing and using fonts to improve readability and brand identity.',
    whyItMatters: 'Most of the web is text. If your typography is bad, your user experience is bad.',
    explanation: 'Typography involves choosing typefaces (Serif vs Sans-Serif), setting font sizes, line heights (leading), and letter spacing (kerning). Good typography ensures the user can read your content without effort.',
    analogy: 'Typography is like the voice of your product. Some voices are formal and serious (Serif), while others are modern and friendly (Sans-Serif).',
    codeExample: 'body {\n  font-family: "Inter", sans-serif;\n  font-size: 16px;\n  line-height: 1.6;\n  letter-spacing: -0.01em;\n}',
    lineByLine: 'We use a clean sans-serif font, a readable size (16px), and generous line-height (1.6) for optimal legibility.',
    commonMistakes: ['Using too many different fonts', 'Line length being too long or too short', 'Not enough contrast between text and background'],
    practice: 'Find two different fonts on Google Fonts—one that feels "Luxury" and one that feels "Tech".',
    challenge: 'Try to read a paragraph with 1.0 line-height vs 1.6 line-height. Which is easier?',
    quiz: [
      {
        question: 'Which type of font is generally considered more "modern" and "clean" for digital screens?',
        options: ['Serif (with small feet)', 'Sans-Serif (without feet)', 'Script (handwritten)', 'Monospace'],
        correctIndex: 1,
        explanation: 'Sans-serif fonts are the standard for digital UI due to their clean lines and high legibility on screens.'
      }
    ],
    recap: 'Typography is about more than just fonts; it\'s about readability and hierarchy.'
  },
  'spacing-and-layout': {
    id: 'spacing-and-layout',
    title: 'Spacing and Layout Basics',
    todayYouAreLearning: 'Using grids and whitespace to create balance and organization.',
    whyItMatters: 'Proper spacing makes a design feel professional and organized. It prevents the UI from feeling "cluttered".',
    explanation: 'We use the 8pt grid system, padding, and margins to create consistent spacing. Layout involves placing elements in a way that follows a logical flow (e.g., F-pattern or Z-pattern).',
    analogy: 'Spacing is like the silence between notes in music. Without the silence, it\'s just noise. Whitespace gives your design room to breathe.',
    codeExample: '.card {\n  padding: 24px; /* Internal space */\n  margin-bottom: 16px; /* External space */\n  display: flex;\n  gap: 12px; /* Space between items */\n}',
    lineByLine: 'We use multiples of 4 or 8 (12, 16, 24) to create a consistent rhythm in our spacing.',
    commonMistakes: ['Cramming too much information into one screen', 'Inconsistent spacing between similar elements', 'Ignoring the "Negative Space" (whitespace)'],
    practice: 'Draw a simple layout for a news article on a piece of paper. Focus on where the gaps should be.',
    challenge: 'What is the "8pt Grid System" and why do designers use it?',
    quiz: [
      {
        question: 'What is "Whitespace" (or Negative Space) in design?',
        options: ['Space that must be filled with content', 'The empty space between design elements', 'A background that is strictly white', 'A mistake in the layout'],
        correctIndex: 1,
        explanation: 'Whitespace is the intentional empty space that helps organize content and improve focus.'
      }
    ],
    recap: 'Consistent spacing is the secret ingredient to a professional-looking UI.'
  },
  'user-journeys': {
    id: 'user-journeys',
    title: 'User Journeys',
    todayYouAreLearning: 'Mapping out the steps a user takes to achieve a goal.',
    whyItMatters: 'A user journey helps you see the "big picture" and identify where users might get stuck or frustrated.',
    explanation: 'A user journey is a visual representation of the process a user goes through. It includes their actions, thoughts, and emotions at each step of the way.',
    analogy: 'A user journey is like a map for a hike. It shows the path, the steep hills (pain points), and the beautiful viewpoints (successes).',
    codeExample: '// User Journey: Ordering Pizza\n1. Open App\n2. Browse Menu\n3. Add to Cart\n4. Enter Address\n5. Pay\n6. Track Delivery',
    lineByLine: 'Each step represents a critical interaction point between the user and the product.',
    commonMistakes: ['Making the journey too complex', 'Assuming the user always takes the "happy path"', 'Ignoring the user\'s emotional state'],
    practice: 'Map out the user journey for "Buying a movie ticket" from start to finish.',
    challenge: 'Identify one "pain point" in the journey of "Waking up and getting to work/school".',
    quiz: [
      {
        question: 'What does a User Journey map primarily help a designer understand?',
        options: ['The color palette of the app', 'The step-by-step experience of the user', 'The coding language needed', 'The marketing budget'],
        correctIndex: 1,
        explanation: 'User journeys focus on the flow and experience of the user as they interact with a product.'
      }
    ],
    recap: 'Design the journey, not just the screens.'
  },
  'user-needs-and-pain-points': {
    id: 'user-needs-and-pain-points',
    title: 'User Needs and Pain Points',
    todayYouAreLearning: 'Identifying what users actually want and what frustrates them.',
    whyItMatters: 'If you don\'t solve a user\'s problem, they won\'t use your product. It\'s that simple.',
    explanation: 'User needs are the goals users want to achieve. Pain points are the specific problems or frustrations they encounter. We find these through research, interviews, and observation.',
    analogy: 'A user need is being hungry. A pain point is a restaurant menu that is impossible to read. Your job is to provide the food AND a clear menu.',
    codeExample: '// Solving a Pain Point: "Password Reset is too hard"\n- Add "Forgot Password" link on login\n- Send one-tap reset link to email\n- Allow login with Google/Apple',
    lineByLine: 'We identify the frustration (hard reset) and provide multiple simple solutions.',
    commonMistakes: ['Solving problems that don\'t exist', 'Ignoring the "silent" frustrations of users', 'Thinking you are the user'],
    practice: 'Interview a friend about an app they hate. Ask them: "What is the most frustrating thing about it?"',
    challenge: 'What is the difference between a "Want" and a "Need" in UX?',
    quiz: [
      {
        question: 'In UX design, what is a "Pain Point"?',
        options: ['A physical injury', 'A specific problem or frustration a user has', 'A bright red button', 'A high price point'],
        correctIndex: 1,
        explanation: 'Pain points are the obstacles that prevent users from having a smooth experience.'
      }
    ],
    recap: 'Great design starts with empathy. Find the pain, then build the cure.'
  },
  'low-fi-wireframes': {
    id: 'low-fi-wireframes',
    title: 'Low-Fidelity Wireframes',
    todayYouAreLearning: 'Creating simple, black-and-white sketches of your layout.',
    whyItMatters: 'Wireframes allow you to iterate on the structure quickly without getting distracted by colors or fonts.',
    explanation: 'Low-fi wireframes use basic shapes (boxes, lines, circles) to represent elements. They focus on placement, hierarchy, and flow. You can do them on paper or using digital tools.',
    analogy: 'A wireframe is like the skeleton of a building. You need to make sure the structure is solid before you start picking out the wallpaper.',
    codeExample: '/* Wireframe representation in CSS */\n.box { border: 1px solid black; background: #eee; }\n.placeholder-img { background: #ccc; display: flex; align-items: center; }',
    lineByLine: 'We use simple placeholders to represent complex UI elements like images and buttons.',
    commonMistakes: ['Adding too much detail too early', 'Using colors in a low-fi wireframe', 'Not showing the wireframes to anyone for feedback'],
    practice: 'Sketch a wireframe for a "Music Player" app on a piece of paper. Use only boxes and lines.',
    challenge: 'Why do we use an "X" inside a box to represent an image in wireframes?',
    quiz: [
      {
        question: 'What is the main purpose of a Low-Fidelity Wireframe?',
        options: ['To show the final colors', 'To test the layout and structure quickly', 'To impress the client with visuals', 'To write the final code'],
        correctIndex: 1,
        explanation: 'Wireframes are for planning the structure and flow, not the visual details.'
      }
    ],
    recap: 'Keep it simple. Focus on the "where" and "what", not the "how it looks".'
  },
  'simple-layout-design': {
    id: 'simple-layout-design',
    title: 'Simple Layout Design',
    todayYouAreLearning: 'Applying basic design rules to create a balanced screen.',
    whyItMatters: 'A good layout guides the user naturally through the information.',
    explanation: 'We use alignment (left, center, right), proximity (grouping related items), and contrast to create a clear visual path. We often use a "Grid" to keep things aligned.',
    analogy: 'A layout is like a well-organized bookshelf. You know exactly where to look for what you need because things are grouped and aligned logically.',
    codeExample: '.container {\n  display: grid;\n  grid-template-columns: 1fr 2fr;\n  gap: 20px;\n  align-items: start;\n}',
    lineByLine: 'We use a grid to create columns and a gap to keep them separated and organized.',
    commonMistakes: ['Randomly placing elements on the screen', 'Not aligning items to a grid', 'Having no clear starting point for the user'],
    practice: 'Take your "Music Player" wireframe and try to align everything to a 3-column grid.',
    challenge: 'What is the "Rule of Thirds" and how can it be used in layout design?',
    quiz: [
      {
        question: 'Which design principle suggests that related items should be placed close together?',
        options: ['Contrast', 'Alignment', 'Proximity', 'Repetition'],
        correctIndex: 2,
        explanation: 'Proximity helps users understand that elements are related by placing them near each other.'
      }
    ],
    recap: 'Alignment and grouping are the keys to a clean layout.'
  },
  'figma-basics': {
    id: 'figma-basics',
    title: 'Figma Basics',
    todayYouAreLearning: 'Navigating the world\'s most popular design tool.',
    whyItMatters: 'Figma is the industry standard. Knowing it is a requirement for almost every UI/UX job.',
    explanation: 'Figma is a cloud-based design tool. You\'ll learn about Frames (artboards), Shapes, Text, Layers, and how to use the Pen tool. It\'s collaborative, meaning multiple people can work at once.',
    analogy: 'Figma is like Google Docs but for designers. It\'s a canvas where you can draw, type, and build together in real-time.',
    codeExample: '// Figma "Code" (CSS Export)\nwidth: 375px;\nheight: 812px;\nbackground: #FFFFFF;\nborder-radius: 40px;',
    lineByLine: 'Figma allows you to see the CSS properties of your designs, which is great for developer handoff.',
    commonMistakes: ['Not using Frames correctly', 'Having messy, unnamed layers', 'Not using "Auto Layout" (we will learn this later!)'],
    practice: 'Open Figma, create a new file, and draw a perfect circle and a rounded rectangle.',
    challenge: 'Find out how to "Share" a Figma file with a view-only link.',
    quiz: [
      {
        question: 'Is Figma a browser-based tool or only for desktop?',
        options: ['Only Desktop', 'Only Browser', 'Both Browser and Desktop', 'Only Mobile'],
        correctIndex: 2,
        explanation: 'Figma works in the browser and has a desktop app, making it very accessible.'
      }
    ],
    recap: 'Figma is your new best friend. Spend time exploring its interface.'
  },
  'canva-basics': {
    id: 'canva-basics',
    title: 'Canva Basics (Optional)',
    todayYouAreLearning: 'Using Canva for quick graphics and social media design.',
    whyItMatters: 'While not a professional UI tool, Canva is great for quick marketing assets and simple presentations.',
    explanation: 'Canva uses templates and drag-and-drop elements. It\'s perfect for non-designers or for designers who need to move fast on simple tasks.',
    analogy: 'If Figma is a professional kitchen, Canva is a high-quality microwave meal. It\'s fast, looks good, and gets the job done when you\'re in a hurry.',
    codeExample: '// No code here! Canva is purely visual drag-and-drop.',
    lineByLine: 'Canva abstracts away the complexity of design tools for speed and ease of use.',
    commonMistakes: ['Using too many generic templates', 'Over-designing simple graphics', 'Thinking Canva replaces professional UI tools like Figma'],
    practice: 'Create a "Coming Soon" social media post for your imaginary app in Canva.',
    challenge: 'Try to recreate a simple Canva template from scratch in Figma.',
    quiz: [
      {
        question: 'What is Canva best used for?',
        options: ['Complex UI Design', 'Coding websites', 'Quick social media graphics and presentations', 'Database management'],
        correctIndex: 2,
        explanation: 'Canva is optimized for speed and ease of use for general graphic design tasks.'
      }
    ],
    recap: 'Canva is a great tool for your secondary design needs.'
  },
  // LEVEL 2: BUILD
  'design-system-components': {
    id: 'design-system-components',
    title: 'UI Design Systems: Components',
    todayYouAreLearning: 'Building reusable building blocks for your interface.',
    whyItMatters: 'Design systems ensure consistency across large products and save designers massive amounts of time.',
    explanation: 'A component is a reusable element like a button, input field, or card. In Figma, we use "Main Components" and "Instances" to manage changes globally.',
    analogy: 'Components are like LEGO bricks. You design the brick once, and then you can use it to build a castle, a car, or a space station.',
    codeExample: '// A React Component mapping to a Design System\nconst PrimaryButton = ({ label }) => (\n  <button className="bg-blue-500 text-white p-4 rounded-lg">\n    {label}\n  </button>\n);',
    lineByLine: 'The code reflects the design system: blue background, white text, specific padding and corners.',
    commonMistakes: ['Not making elements reusable', 'Having 10 different versions of the same button', 'Ignoring edge cases (e.g., long text in a button)'],
    practice: 'Create a "Button" component in Figma with a hover state.',
    challenge: 'What is "Atomic Design" and how does it relate to components?',
    quiz: [
      {
        question: 'In Figma, what happens when you change the "Main Component"?',
        options: ['Nothing happens to other elements', 'Only that specific element changes', 'All "Instances" of that component update automatically', 'The file gets deleted'],
        correctIndex: 2,
        explanation: 'This is the power of components—update once, and it reflects everywhere.'
      }
    ],
    recap: 'Build once, use everywhere. Components are the foundation of modern UI.'
  },
  'buttons-cards-inputs': {
    id: 'buttons-cards-inputs',
    title: 'Buttons, Cards, and Inputs',
    todayYouAreLearning: 'Designing the most common UI elements with precision.',
    whyItMatters: 'These are the workhorses of any UI. If they are poorly designed, the whole app feels broken.',
    explanation: 'We study the anatomy of a button (label, icon, container), a card (image, title, body, action), and an input field (label, placeholder, focus state).',
    analogy: 'These elements are like the steering wheel, pedals, and dashboard of a car. They need to be in the right place and feel right to the touch.',
    codeExample: '/* Card styling */\n.card {\n  border-radius: 12px;\n  box-shadow: 0 4px 6px rgba(0,0,0,0.1);\n  overflow: hidden;\n  transition: transform 0.2s;\n}',
    lineByLine: 'We use rounded corners, subtle shadows, and hover transitions to make cards feel interactive.',
    commonMistakes: ['Buttons that don\'t look clickable', 'Input fields without clear labels', 'Cards that are too cluttered with information'],
    practice: 'Design a "Product Card" for an e-commerce app in Figma.',
    challenge: 'What are the 4 main states of a button? (Normal, Hover, Pressed, Disabled)',
    quiz: [
      {
        question: 'What is the purpose of a "Placeholder" in an input field?',
        options: ['To show the final data', 'To provide a hint about what to type', 'To hide the user\'s password', 'To make the box look full'],
        correctIndex: 1,
        explanation: 'Placeholders guide the user on what information is expected in that field.'
      }
    ],
    recap: 'Master the basics. Perfect your buttons, cards, and inputs.'
  },
  'design-consistency': {
    id: 'design-consistency',
    title: 'Design Consistency',
    todayYouAreLearning: 'Maintaining a unified look and feel across your entire product.',
    whyItMatters: 'Consistency builds trust and makes the app easier to learn. Inconsistency feels unprofessional and confusing.',
    explanation: 'Consistency means using the same colors, fonts, spacing, and interaction patterns everywhere. If a "Delete" button is red on one screen, it should be red on all screens.',
    analogy: 'Consistency is like a brand\'s personality. If your best friend suddenly started acting like a completely different person every day, you\'d be confused and stop trusting them.',
    codeExample: '// Using constants for consistency\nconst COLORS = {\n  PRIMARY: "#3B82F6",\n  SECONDARY: "#6B7280",\n  ACCENT: "#F59E0B"\n};',
    lineByLine: 'By using a central set of constants, we ensure the same colors are used throughout the code.',
    commonMistakes: ['Using slightly different shades of the same color', 'Mixing different icon styles (e.g., outlined and filled)', 'Having inconsistent padding on different pages'],
    practice: 'Review your "Mobile App" design. Are all your headings the same size and color?',
    challenge: 'Why is "Internal Consistency" different from "External Consistency"?',
    quiz: [
      {
        question: 'Why is consistency important in UI design?',
        options: ['It makes the app look more colorful', 'It reduces the user\'s "cognitive load" (thinking effort)', 'It allows you to use fewer images', 'It makes the code run faster'],
        correctIndex: 1,
        explanation: 'When things are consistent, users don\'t have to re-learn how to use your app on every screen.'
      }
    ],
    recap: 'Consistency is the hallmark of a professional designer.'
  },
  'user-personas': {
    id: 'user-personas',
    title: 'User Personas',
    todayYouAreLearning: 'Creating fictional characters to represent your real users.',
    whyItMatters: 'Personas help you design for specific needs rather than a generic "everyone". They keep the team focused on the user.',
    explanation: 'A persona includes a name, photo, goals, frustrations, and a short bio. It\'s based on real research data, not just imagination.',
    analogy: 'A persona is like a character in a movie. The writers need to know exactly who they are to write believable dialogue. You need to know your user to design a believable product.',
    codeExample: '// Persona Data Object\nconst persona = {\n  name: "Sarah the Student",\n  age: 21,\n  goal: "Find affordable textbooks quickly",\n  painPoint: "High shipping costs and slow delivery"\n};',
    lineByLine: 'We summarize the user\'s core identity and needs into a simple, relatable format.',
    commonMistakes: ['Creating too many personas', 'Making personas based on stereotypes', 'Creating "Perfect" personas that have no problems'],
    practice: 'Create a persona for a "Fitness App" user. What are their goals and fears?',
    challenge: 'What is the difference between a "User Persona" and a "Marketing Segment"?',
    quiz: [
      {
        question: 'What is a User Persona?',
        options: ['A real person you interviewed', 'A fictional character representing a user group', 'A list of all your app features', 'A type of social media profile'],
        correctIndex: 1,
        explanation: 'Personas are archetypes that help designers empathize with their target audience.'
      }
    ],
    recap: 'Design for Sarah, not for "the user".'
  },
  'surveys-and-feedback': {
    id: 'surveys-and-feedback',
    title: 'Surveys and Feedback',
    todayYouAreLearning: 'Gathering quantitative and qualitative data from real users.',
    whyItMatters: 'You can\'t improve what you don\'t measure. Feedback tells you if your design is actually working.',
    explanation: 'Surveys give you "What" (numbers), while interviews and feedback give you "Why" (reasons). We use tools like Google Forms, Typeform, or in-app feedback widgets.',
    analogy: 'Feedback is like a GPS. It tells you if you\'re on the right track or if you need to make a U-turn.',
    codeExample: '// Simple Feedback Form Logic\nif (userClosedAppQuickly) {\n  showSurvey("Was something confusing?");\n}',
    lineByLine: 'We trigger feedback requests based on specific user behaviors to get context-rich data.',
    commonMistakes: ['Asking leading questions (e.g., "Don\'t you love our app?")', 'Asking too many questions in one survey', 'Ignoring negative feedback'],
    practice: 'Write 3 non-leading questions for a survey about a "Food Delivery App".',
    challenge: 'What is the "Net Promoter Score" (NPS) and how is it calculated?',
    quiz: [
      {
        question: 'Which type of data tells you "Why" a user is doing something?',
        options: ['Quantitative (Numbers)', 'Qualitative (Reasons/Feelings)', 'Binary Data', 'Metadata'],
        correctIndex: 1,
        explanation: 'Qualitative data, like interview answers, provides the "why" behind user behavior.'
      }
    ],
    recap: 'Listen to your users. They have the answers you need.'
  },
  'figma-prototyping-basics': {
    id: 'figma-prototyping-basics',
    title: 'Figma Prototyping Basics',
    todayYouAreLearning: 'Making your static designs interactive.',
    whyItMatters: 'Prototypes allow you to test the flow and feel of an app without writing a single line of code.',
    explanation: 'You\'ll learn how to connect screens using "Noodles", set triggers (On Click, On Hover), and use basic transitions (Dissolve, Slide In).',
    analogy: 'A prototype is like a movie set. It looks real from the front, and you can walk through the doors, even if there\'s nothing behind them yet.',
    codeExample: '// Prototyping logic in code (React Router)\n<Link to="/profile">\n  <Button label="View Profile" />\n</Link>',
    lineByLine: 'The "Noodle" in Figma is equivalent to a "Link" in code—it defines where the user goes next.',
    commonMistakes: ['Making the prototype too complex too early', 'Broken links that lead nowhere', 'Not testing the prototype on a real device'],
    practice: 'Connect two screens in Figma: a "Login" screen and a "Home" screen.',
    challenge: 'What is the difference between a "Low-Fidelity" and "High-Fidelity" prototype?',
    quiz: [
      {
        question: 'What is the main goal of a prototype?',
        options: ['To show the final code', 'To test the flow and interactions', 'To store user data', 'To make the app faster'],
        correctIndex: 1,
        explanation: 'Prototypes are for testing how the app feels and flows before it\'s built.'
      }
    ],
    recap: 'Bring your designs to life. Start with simple connections.'
  },
  'advanced-transitions': {
    id: 'advanced-transitions',
    title: 'Advanced Transitions & Smart Animate',
    todayYouAreLearning: 'Creating smooth, app-like animations in Figma.',
    whyItMatters: 'Smooth transitions make an app feel premium and polished. "Smart Animate" is Figma\'s most powerful feature.',
    explanation: 'Smart Animate automatically animates between two layers with the same name. You\'ll learn about Easing (Linear, Ease In/Out) and timing.',
    analogy: 'Smart Animate is like "Tweening" in old animation. You show the start and the end, and Figma fills in the middle for you.',
    codeExample: '/* CSS equivalent of Smart Animate */\n.box {\n  transition: all 0.3s ease-in-out;\n}\n.box.active {\n  transform: scale(1.2);\n  background: blue;\n}',
    lineByLine: 'We define the transition properties and the "active" state, and the browser animates the change.',
    commonMistakes: ['Using too many flashy animations', 'Animations that are too slow and waste the user\'s time', 'Not naming layers identically (Smart Animate will fail!)'],
    practice: 'Create a "Toggle Switch" that slides smoothly when clicked using Smart Animate.',
    challenge: 'What is "Staggered Animation" and why is it used?',
    quiz: [
      {
        question: 'What is required for Figma\'s "Smart Animate" to work between two screens?',
        options: ['The screens must have different colors', 'The layers must have the same name on both screens', 'You must use the Pen tool', 'You must be a Pro user'],
        correctIndex: 1,
        explanation: 'Figma uses the layer name to track which elements to animate between screens.'
      }
    ],
    recap: 'Master Smart Animate to create prototypes that look like real apps.'
  },
  'mobile-first-design': {
    id: 'mobile-first-design',
    title: 'Mobile-First Design',
    todayYouAreLearning: 'Designing for the smallest screen first to prioritize content.',
    whyItMatters: 'Most people use the web on their phones. Designing for mobile first forces you to focus on what\'s truly important.',
    explanation: 'Mobile-first design involves starting with the mobile layout and then "scaling up" to tablet and desktop. It ensures a great experience on the most constrained device.',
    analogy: 'Mobile-first is like packing a small suitcase for a trip. You only take the essentials. If you have a bigger suitcase later (Desktop), you can add more, but the essentials are already there.',
    codeExample: '/* Mobile-First CSS */\n.container { width: 100%; }\n\n@media (min-width: 768px) {\n  .container { width: 50%; } /* Desktop scale up */\n}',
    lineByLine: 'We start with the 100% width (mobile) and only change it for larger screens (min-width: 768px).',
    commonMistakes: ['Designing for desktop first and "shrinking" it for mobile', 'Touch targets (buttons) being too small for fingers', 'Too much text for a small screen'],
    practice: 'Take a desktop website you like and sketch how it would look on a phone.',
    challenge: 'What is the recommended minimum size for a touch target (button) on mobile? (Hint: 44x44px)',
    quiz: [
      {
        question: 'Why do we design for mobile first?',
        options: ['Because mobile phones are more expensive', 'To force prioritization of the most important content', 'Because coding for mobile is easier', 'To avoid using images'],
        correctIndex: 1,
        explanation: 'Small screens force you to remove clutter and focus on the core user goals.'
      }
    ],
    recap: 'Think small to win big. Start with mobile.'
  },
  'responsive-ui-layouts': {
    id: 'responsive-ui-layouts',
    title: 'Responsive UI Layouts',
    todayYouAreLearning: 'Creating designs that adapt perfectly to any screen size.',
    whyItMatters: 'Users switch between devices constantly. Your design must look great on a phone, a laptop, and a giant monitor.',
    explanation: 'We use Breakpoints, Fluid Grids, and Flexible Images. In Figma, we use "Constraints" and "Auto Layout" to make our designs responsive.',
    analogy: 'A responsive layout is like water. It takes the shape of whatever container (device) you pour it into.',
    codeExample: '.grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));\n}',
    lineByLine: 'This CSS automatically adjusts the number of columns based on the available screen width.',
    commonMistakes: ['Using fixed pixel widths (e.g., width: 1200px)', 'Not testing on different screen sizes', 'Hiding important content on mobile'],
    practice: 'Use Figma Constraints to make a header that stays at the top and stretches to full width.',
    challenge: 'What is a "Breakpoint" in responsive design?',
    quiz: [
      {
        question: 'Which Figma feature helps make elements responsive within a frame?',
        options: ['Pen Tool', 'Constraints', 'Masking', 'Effects'],
        correctIndex: 1,
        explanation: 'Constraints tell Figma how an element should behave when its parent frame is resized.'
      }
    ],
    recap: 'Design for flexibility. Your UI should be like water.'
  },
  'landing-page-design': {
    id: 'landing-page-design',
    title: 'Landing Page Design',
    todayYouAreLearning: 'Designing high-converting pages that sell a product or service.',
    whyItMatters: 'A landing page is often the first impression a user has. Its job is to convert visitors into customers.',
    explanation: 'Key elements include the Hero Section (Headline, Subheadline, CTA), Social Proof (Testimonials), Features/Benefits, and a final CTA.',
    analogy: 'A landing page is like a professional salesperson. It needs to grab attention, build trust, explain the value, and close the deal.',
    codeExample: '<!-- Hero Section Structure -->\n<section class="hero">\n  <h1>The Best App Ever</h1>\n  <p>Solve all your problems today.</p>\n  <button>Get Started Free</button>\n</section>',
    lineByLine: 'The hierarchy is clear: Big headline, supporting text, and a prominent "Call to Action" (CTA) button.',
    commonMistakes: ['No clear Call to Action (CTA)', 'Too much text above the fold', 'Slow-loading images that frustrate users'],
    practice: 'Design the "Hero Section" for a new "AI Coffee Maker" landing page.',
    challenge: 'What does "Above the Fold" mean in web design?',
    quiz: [
      {
        question: 'What is the most important element of a landing page?',
        options: ['The footer', 'The Call to Action (CTA)', 'The copyright notice', 'The background pattern'],
        correctIndex: 1,
        explanation: 'The CTA is the primary action you want the user to take (e.g., Sign Up, Buy Now).'
      }
    ],
    recap: 'Focus on the goal. Every element should lead to the CTA.'
  },
  'dashboard-ui-design': {
    id: 'dashboard-ui-design',
    title: 'Dashboard UI Design',
    todayYouAreLearning: 'Organizing complex data into a clean, actionable interface.',
    whyItMatters: 'Dashboards are used for work. If they are messy, users can\'t do their jobs effectively.',
    explanation: 'We focus on Data Visualization (charts, graphs), Navigation (sidebars), and Information Density. The goal is to show the most important data at a glance.',
    analogy: 'A dashboard is like the cockpit of an airplane. The pilot needs to see the most critical info (altitude, speed) clearly, with secondary controls easily accessible.',
    codeExample: '// Dashboard Layout Component\n<div class="flex h-screen">\n  <Sidebar />\n  <main class="flex-1 p-8">\n    <StatsGrid />\n    <MainChart />\n  </main>\n</div>',
    lineByLine: 'We use a flexbox layout with a fixed sidebar and a flexible main content area for the data.',
    commonMistakes: ['Overwhelming the user with too much data', 'Using the wrong type of chart for the data', 'Poor navigation that makes it hard to find deep pages'],
    practice: 'Design a "Daily Activity" widget for a fitness dashboard.',
    challenge: 'When should you use a Bar Chart vs. a Line Chart?',
    quiz: [
      {
        question: 'What is the primary goal of a dashboard?',
        options: ['To show as much data as possible', 'To help users make quick, data-driven decisions', 'To use many different colors', 'To hide the navigation'],
        correctIndex: 1,
        explanation: 'Dashboards should prioritize actionable insights over raw data volume.'
      }
    ],
    recap: 'Clarity is king. Simplify the complex.'
  },
  // LEVEL 3: REAL-WORLD
  'case-study-approach': {
    id: 'case-study-approach',
    title: 'The Case Study Approach',
    todayYouAreLearning: 'How to document your design process to show your value to employers.',
    whyItMatters: 'Employers don\'t just want to see pretty pictures; they want to see how you think and solve problems.',
    explanation: 'A case study follows a structure: The Problem, The Research, The Solution, The Design, and The Results. It tells the story of your project.',
    analogy: 'A case study is like a science fair project. You don\'t just show the volcano; you show the hypothesis, the experiment, and what you learned.',
    codeExample: '// Case Study Structure\n# Project Title\n## The Problem\n## User Research\n## Wireframes\n## Final Design\n## Impact & Results',
    lineByLine: 'This structure guides the reader through your logical process from start to finish.',
    commonMistakes: ['Only showing the final screens', 'Writing too much text that no one reads', 'Not explaining the "Why" behind your decisions'],
    practice: 'Pick a small project you\'ve done. Write down the "Problem" it solved in 3 sentences.',
    challenge: 'Find a professional UI/UX case study on Medium or Behance and analyze its structure.',
    quiz: [
      {
        question: 'What is the most important part of a design case study for an employer?',
        options: ['The final high-fidelity screens', 'The explanation of your problem-solving process', 'The fonts you used', 'The number of pages'],
        correctIndex: 1,
        explanation: 'Employers hire you for your thinking and process, not just your ability to use Figma.'
      }
    ],
    recap: 'Tell a story. Show your work, but more importantly, show your thoughts.'
  },
  'solving-real-problems': {
    id: 'solving-real-problems',
    title: 'Solving Real-World Problems',
    todayYouAreLearning: 'Applying design thinking to actual business and user challenges.',
    whyItMatters: 'Real-world design is messy. You need to balance user needs with business goals and technical constraints.',
    explanation: 'We look at real scenarios: "Our checkout abandonment is 70%, how do we fix it?" or "Users can\'t find the search bar on mobile." We use data and empathy to find solutions.',
    analogy: 'Solving real problems is like being a detective. You look for clues (data), interview witnesses (users), and find the culprit (the design flaw).',
    codeExample: '// Problem: High Abandonment\n// Solution: One-page checkout\nconst Checkout = () => (\n  <form>\n    <ShippingInfo />\n    <PaymentInfo />\n    <SubmitButton label="Pay Now" />\n  </form>\n);',
    lineByLine: 'We simplify the process into a single, clear flow to reduce friction and abandonment.',
    commonMistakes: ['Ignoring business goals', 'Not considering technical limitations', 'Solving the wrong problem'],
    practice: 'Identify a problem in a local business\'s website (e.g., a restaurant menu that is a PDF). How would you fix it?',
    challenge: 'What is "Design Thinking" and what are its 5 stages?',
    quiz: [
      {
        question: 'When solving a design problem, whose needs should come first?',
        options: ['The designer\'s', 'The CEO\'s', 'The user\'s', 'The developer\'s'],
        correctIndex: 2,
        explanation: 'User-centered design means the user\'s needs are the primary focus, balanced with business goals.'
      }
    ],
    recap: 'Design is about impact. Solve the right problems.'
  },
  'presenting-designs': {
    id: 'presenting-designs',
    title: 'Presenting Your Designs',
    todayYouAreLearning: 'How to explain and defend your design choices to stakeholders.',
    whyItMatters: 'If you can\'t sell your design, it will never get built. Communication is a core design skill.',
    explanation: 'We learn how to use "Design Rationale" (explaining the why), handle criticism gracefully, and use storytelling to engage your audience.',
    analogy: 'Presenting is like being a lawyer. You have your evidence (research) and you are making a case for your client (the user).',
    codeExample: '// Design Rationale Example\n"I chose a bottom navigation bar because our research showed that users primarily use the app with one hand while walking."',
    lineByLine: 'This statement links a design choice (bottom nav) to a specific user insight (one-handed use).',
    commonMistakes: ['Getting defensive when receiving feedback', 'Using too much design jargon', 'Not linking design choices to user needs or data'],
    practice: 'Record a 2-minute video of yourself explaining one screen you designed.',
    challenge: 'How do you handle a stakeholder who says "I just don\'t like the color blue"?',
    quiz: [
      {
        question: 'What is "Design Rationale"?',
        options: ['A type of design software', 'The logical reasoning behind your design choices', 'A list of all the colors used', 'A contract for design work'],
        correctIndex: 1,
        explanation: 'Design rationale explains the "why" behind your "what".'
      }
    ],
    recap: 'Be a confident communicator. Back your choices with data.'
  },
  'behance-portfolio-setup': {
    id: 'behance-portfolio-setup',
    title: 'Behance & Portfolio Setup',
    todayYouAreLearning: 'Building a professional presence on design platforms.',
    whyItMatters: 'Your portfolio is your resume. Behance is where the design community and recruiters look for talent.',
    explanation: 'We cover how to create high-quality "Mockups" (putting your design on a phone/laptop), writing engaging project descriptions, and networking.',
    analogy: 'Your portfolio is your storefront. It needs to look inviting, show your best products, and tell people who you are.',
    codeExample: '// Portfolio Metadata\nconst portfolio = {\n  platform: "Behance",\n  projects: 3,\n  status: "Looking for opportunities",\n  specialization: "Mobile UI/UX"\n};',
    lineByLine: 'We define our professional identity and focus to attract the right opportunities.',
    commonMistakes: ['Quantity over quality (too many mediocre projects)', 'No way to contact you', 'Using low-quality or blurry images'],
    practice: 'Create a Behance account and follow 5 designers whose work you admire.',
    challenge: 'What are "Mockups" and why are they important for a portfolio?',
    quiz: [
      {
        question: 'What is the primary purpose of a design portfolio?',
        options: ['To store all your files', 'To showcase your skills and thinking to potential employers', 'To get likes from friends', 'To practice using Figma'],
        correctIndex: 1,
        explanation: 'A portfolio is a tool to get you hired by proving your capabilities.'
      }
    ],
    recap: 'Your portfolio is a living document. Keep it fresh and high-quality.'
  },
  'developer-handoff': {
    id: 'developer-handoff',
    title: 'Developer Handoff',
    todayYouAreLearning: 'Preparing your designs so developers can build them perfectly.',
    whyItMatters: 'A design is useless if it can\'t be built. Good handoff prevents "Design vs. Reality" gaps.',
    explanation: 'We learn how to organize Figma files, export assets (SVG, PNG), provide redlines (specs), and document animations.',
    analogy: 'Handoff is like a relay race. You need to pass the baton (the design) smoothly so the next runner (the developer) can keep the momentum.',
    codeExample: '/* Developer Handoff Specs */\n- Button Height: 48px\n- Border Radius: 8px\n- Font: Inter SemiBold 16px\n- Color: #3B82F6',
    lineByLine: 'We provide the exact values developers need to recreate the design in code.',
    commonMistakes: ['Sending a messy Figma file with no instructions', 'Not exporting assets correctly', 'Ignoring technical constraints (e.g., "This animation is impossible")'],
    practice: 'Prepare one screen in Figma for handoff. Name all layers and mark assets for export.',
    challenge: 'What is "Inspect Mode" in Figma and how do developers use it?',
    quiz: [
      {
        question: 'What is a "Design Handoff"?',
        options: ['Giving your computer to a developer', 'The process of transferring design specs and assets to developers', 'A type of design meeting', 'When a designer quits a project'],
        correctIndex: 1,
        explanation: 'Handoff is the critical bridge between design and code.'
      }
    ],
    recap: 'Be a developer\'s favorite designer. Make their job easy.'
  },
  'frontend-for-designers': {
    id: 'frontend-for-designers',
    title: 'Frontend Basics for Designers',
    todayYouAreLearning: 'Understanding HTML, CSS, and JS to design better products.',
    whyItMatters: 'Knowing how the web works helps you design things that are technically feasible and easier to build.',
    explanation: 'We cover the Box Model, Flexbox/Grid concepts, and how CSS handles colors and fonts. You don\'t need to be a pro coder, but you need to speak the language.',
    analogy: 'Learning frontend is like an architect learning about bricks and steel. You don\'t have to lay the bricks, but you need to know what they can and can\'t do.',
    codeExample: '.box {\n  width: 100px;\n  height: 100px;\n  padding: 10px;\n  border: 5px solid black;\n  margin: 20px;\n} /* Total width = 130px */',
    lineByLine: 'Understanding the Box Model (content + padding + border + margin) is essential for layout design.',
    commonMistakes: ['Designing things that are impossible to code', 'Not understanding how responsive design works in code', 'Ignoring accessibility standards (WCAG)'],
    practice: 'Try to build a simple button in HTML and CSS using a tool like CodePen.',
    challenge: 'What is the difference between "Padding" and "Margin" in the CSS Box Model?',
    quiz: [
      {
        question: 'Why should a UI/UX designer learn basic HTML/CSS?',
        options: ['To replace the developers', 'To understand technical constraints and communicate better', 'To get paid more for doing two jobs', 'To build their own computer'],
        correctIndex: 1,
        explanation: 'Technical knowledge makes you a more effective and realistic designer.'
      }
    ],
    recap: 'Code is the medium of your design. Understand your medium.'
  },
  'getting-clients': {
    id: 'getting-clients',
    title: 'Getting Clients & Freelancing',
    todayYouAreLearning: 'How to find work as an independent designer.',
    whyItMatters: 'Freelancing offers freedom and variety, but it requires business skills that aren\'t taught in design school.',
    explanation: 'We cover platforms (Upwork, Toptal), cold outreach, networking, and building a personal brand.',
    analogy: 'Freelancing is like running your own small shop. You are the designer, the salesperson, the accountant, and the janitor.',
    codeExample: '// Freelance Outreach Template\n"Hi [Name], I saw your website and noticed [Problem]. I\'d love to help you fix it by [Solution]. Here is my portfolio..." ',
    lineByLine: 'A good outreach message is personalized, identifies a problem, and offers a specific solution.',
    commonMistakes: ['Underpricing your work', 'Not having a contract', 'Taking on "Nightmare Clients" who don\'t respect your time'],
    practice: 'Write a cold email to a local business offering to redesign their homepage.',
    challenge: 'What is a "Retainer" in freelancing?',
    quiz: [
      {
        question: 'What is the most important thing to have before starting as a freelance designer?',
        options: ['A fancy office', 'A solid portfolio of work', 'A very expensive laptop', 'A 10-page business plan'],
        correctIndex: 1,
        explanation: 'Your portfolio is your primary tool for convincing clients to hire you.'
      }
    ],
    recap: 'Freelancing is a business. Treat it like one.'
  },
  'pricing-and-interviews': {
    id: 'pricing-and-interviews',
    title: 'Pricing and Job Interviews',
    todayYouAreLearning: 'Valuing your work and acing the design interview.',
    whyItMatters: 'You deserve to be paid fairly. Interviews are your chance to show you are the right fit for a team.',
    explanation: 'We cover Hourly vs. Project-based pricing, and common interview questions like "Walk me through a project" or "How do you handle feedback?"',
    analogy: 'Pricing is like a menu. You need to know the value of your ingredients and your skill. An interview is like a first date—both sides are seeing if they want a long-term relationship.',
    codeExample: '// Pricing Formula\n(Desired Annual Salary + Expenses) / Billable Hours = Hourly Rate',
    lineByLine: 'We use a simple formula to ensure our freelance rate covers our needs and business costs.',
    commonMistakes: ['Not researching salary ranges before an interview', 'Being afraid to talk about money', 'Not asking questions back to the interviewer'],
    practice: 'Research the average salary for a "Junior UI/UX Designer" in your city or country.',
    challenge: 'How would you answer the question: "What is your biggest weakness as a designer?"',
    quiz: [
      {
        question: 'When asked about your design process in an interview, what should you focus on?',
        options: ['The software you use', 'How you solve problems for users', 'How fast you can work', 'Your favorite colors'],
        correctIndex: 1,
        explanation: 'Interviewer want to see your problem-solving mindset and user-centered approach.'
      }
    ],
    recap: 'Know your value. Be prepared. Be professional.'
  },
  'usability-testing': {
    id: 'usability-testing',
    title: 'Usability Testing',
    todayYouAreLearning: 'Watching real users use your product to find where it fails.',
    whyItMatters: 'You are not the user. Usability testing reveals the "blind spots" in your design.',
    explanation: 'We cover Moderated vs. Unmoderated testing, creating a test plan, and how to synthesize findings into actionable improvements.',
    analogy: 'Usability testing is like a dress rehearsal for a play. You see where the actors trip and where the audience gets bored before the big opening night.',
    codeExample: '// Usability Test Task\n"Try to find a pair of red running shoes under $50 and add them to your cart."',
    lineByLine: 'We give the user a specific goal and observe their behavior without helping them.',
    commonMistakes: ['Helping the user when they get stuck', 'Testing with too many people (5 is often enough!)', 'Ignoring the results because they "hurt your feelings"'],
    practice: 'Ask a family member to perform a task on an app you designed. Don\'t say a word while they do it.',
    challenge: 'What is the "Think Aloud" method in usability testing?',
    quiz: [
      {
        question: 'How many users are typically needed to find 80% of usability issues?',
        options: ['100+', '50', '5', '1'],
        correctIndex: 2,
        explanation: 'Research by Jakob Nielsen shows that testing with just 5 users reveals the majority of usability problems.'
      }
    ],
    recap: 'Test early, test often. Let the users guide your design.'
  },
  'ab-testing-ux': {
    id: 'ab-testing-ux',
    title: 'A/B Testing for UX',
    todayYouAreLearning: 'Comparing two versions of a design to see which performs better.',
    whyItMatters: 'A/B testing takes the guesswork out of design. It provides hard data on what users prefer.',
    explanation: 'Version A (Control) vs. Version B (Variant). We change one variable (e.g., button color or headline) and measure the conversion rate.',
    analogy: 'A/B testing is like a taste test between two sodas. You give both to a large group and see which one more people prefer.',
    codeExample: '// A/B Testing Logic\nif (userGroup === "A") {\n  showBlueButton();\n} else {\n  showGreenButton();\n}',
    lineByLine: 'We split our audience and show them different versions to measure the impact of a single change.',
    commonMistakes: ['Testing too many things at once', 'Not running the test long enough to get significant data', 'Ignoring the qualitative "Why" behind the "What"'],
    practice: 'Design two versions of a "Sign Up" button. What one variable did you change?',
    challenge: 'What is "Statistical Significance" in A/B testing?',
    quiz: [
      {
        question: 'What is the main advantage of A/B testing?',
        options: ['It makes the app look better', 'It provides data-driven proof of which design works better', 'It is faster than wireframing', 'It replaces the need for UX research'],
        correctIndex: 1,
        explanation: 'A/B testing uses real user behavior to decide between design options.'
      }
    ],
    recap: 'Data-driven design is powerful. Test your assumptions.'
  },
  'browser-internals': {
    id: 'browser-internals',
    title: 'Browser Internals',
    todayYouAreLearning: 'How browsers like Chrome and Safari actually turn code into pixels.',
    whyItMatters: 'Understanding the rendering engine helps you build faster, smoother websites.',
    explanation: 'A browser has two main engines: the Rendering Engine (for HTML/CSS) and the JavaScript Engine (like V8). It goes through a process: 1. Parsing HTML to build the DOM. 2. Parsing CSS to build the CSSOM. 3. Combining them into a Render Tree. 4. Layout (calculating positions). 5. Painting (drawing pixels).',
    analogy: 'Think of a browser like a construction crew. The HTML is the blueprint, the CSS is the interior design plan, and the JS is the electrician. They all work together to build the house (the website) from the ground up.',
    visualExplanation: 'Imagine a tree structure where the trunk is the <html> and every branch is a tag like <div> or <p>. This is the DOM (Document Object Model).',
    codeExample: '// The browser uses the DOM API to interact with the page\nconsole.log(document.body);',
    lineByLine: 'The "document" object represents the entire web page. Accessing ".body" gives us the main content area.',
    commonMistakes: ['Thinking the browser is just a window—it is a complex operating system for web apps.', 'Ignoring the "Critical Rendering Path" which affects loading speed.'],
    practice: 'Open Chrome DevTools, go to the "Performance" tab, and record a page load to see the rendering steps.',
    challenge: 'What is the difference between "Reflow" and "Repaint"?',
    quiz: [
      {
        question: 'What are the two main engines inside a browser?',
        options: ['HTML and CSS', 'Rendering and JavaScript', 'Storage and Network', 'Graphics and Sound'],
        correctIndex: 1,
        explanation: 'Browsers use a rendering engine for visuals and a JS engine for logic.'
      }
    ],
    recap: 'Browsers are powerful engines that transform text files into interactive visual experiences.'
  },
  'dev-tools-setup': {
    id: 'dev-tools-setup',
    title: 'Dev Tools Setup',
    todayYouAreLearning: 'Setting up your professional development environment for frontend mastery.',
    whyItMatters: 'A professional setup makes you 10x faster and helps you catch bugs before they reach users.',
    explanation: 'Every frontend dev needs three main tools: 1. A powerful code editor (VS Code). 2. A modern browser (Chrome/Firefox). 3. The Terminal. We use extensions like Prettier for formatting, ESLint for catching errors, and Live Server for instant previews.',
    analogy: 'A developer without good tools is like a carpenter without a level or a saw. You might build something, but it will be slow and crooked.',
    visualExplanation: 'Your screen should be split: Code on the left, Browser on the right. This "Live Feedback Loop" is the secret to fast learning.',
    codeExample: '// No code here, but try this in your terminal:\nnode --version\ngit --version',
    lineByLine: 'Checking versions ensures your tools are installed correctly and ready for work.',
    commonMistakes: ['Using a simple text editor instead of an IDE like VS Code.', 'Not learning keyboard shortcuts early on.'],
    practice: 'Install VS Code and the "Prettier" extension. Set it to "Format on Save".',
    challenge: 'Find and learn 5 essential VS Code keyboard shortcuts.',
    quiz: [
      {
        question: 'Which tool is used for catching code errors as you type?',
        options: ['Prettier', 'ESLint', 'Live Server', 'Terminal'],
        correctIndex: 1,
        explanation: 'ESLint analyzes your code to find and report on patterns that might lead to bugs.'
      }
    ],
    recap: 'A clean, professional setup is the foundation of your development career.'
  },
  'html-media': {
    id: 'html-media',
    title: 'HTML Media',
    todayYouAreLearning: 'Adding images, videos, and audio to your web pages correctly.',
    whyItMatters: 'Media makes the web engaging. Doing it wrong makes your site slow and inaccessible.',
    explanation: 'We use the `<img>` tag for images, `<video>` for movies, and `<audio>` for sound. Crucially, we must provide "alt text" for images so screen readers can describe them to visually impaired users.',
    analogy: 'Media tags are like frames in a gallery. The tag is the frame, and the "src" attribute is the actual painting you put inside it.',
    visualExplanation: 'The "alt" attribute is like a label on the back of a photo. If the photo is lost, the label still tells you what was there.',
    codeExample: '<img src="profile.jpg" alt="A professional headshot of a developer">\n<video controls>\n  <source src="demo.mp4" type="video/mp4">\n</video>',
    lineByLine: 'The "src" points to the file. "alt" provides a description. "controls" adds play/pause buttons to the video.',
    commonMistakes: ['Forgetting the "alt" attribute.', 'Using massive image files that slow down the page.'],
    practice: 'Add an image to your profile page and give it a descriptive alt tag.',
    challenge: 'What is the "poster" attribute used for in a <video> tag?',
    quiz: [
      {
        question: 'Which attribute is essential for accessibility in an <img> tag?',
        options: ['src', 'width', 'alt', 'title'],
        correctIndex: 2,
        explanation: 'The "alt" attribute provides a text description for users who cannot see the image.'
      }
    ],
    recap: 'Media brings your site to life, but always prioritize performance and accessibility.'
  },
  'accessibility-basics': {
    id: 'accessibility-basics',
    title: 'Accessibility Basics',
    todayYouAreLearning: 'Building websites that everyone can use, regardless of their abilities.',
    whyItMatters: 'Accessibility (a11y) is a human right. It also improves SEO and makes your site better for everyone.',
    explanation: 'Web accessibility means ensuring people with disabilities can perceive, understand, and interact with the web. This includes using semantic HTML, providing enough color contrast, and making sure the site is keyboard-navigable.',
    analogy: 'Building an inaccessible website is like building a public library with only stairs and no ramps. You are excluding people from accessing information.',
    visualExplanation: 'Imagine using your computer with only a keyboard. Can you reach every button? This is a core test of accessibility.',
    codeExample: '<!-- Good: Semantic and Accessible -->\n<button aria-label="Close Menu">X</button>\n\n<!-- Bad: Not accessible -->\n<span onclick="close()">X</span>',
    lineByLine: 'The button is naturally focusable and has a clear label for screen readers. The span is invisible to non-mouse users.',
    commonMistakes: ['Using color alone to convey meaning.', 'Using non-semantic tags like <div> for buttons.'],
    practice: 'Try to navigate your favorite website using only the "Tab" and "Enter" keys.',
    challenge: 'What does "ARIA" stand for in web development?',
    quiz: [
      {
        question: 'What is the primary goal of web accessibility?',
        options: ['To make sites look better', 'To ensure everyone can use the web regardless of ability', 'To make code run faster', 'To reduce the number of tags used'],
        correctIndex: 1,
        explanation: 'Accessibility ensures that people with disabilities have equal access to information and functionality on the web.'
      }
    ],
    recap: 'Accessibility is not a feature; it is a fundamental requirement of professional web development.'
  },
  'css-selectors': {
    id: 'css-selectors',
    title: 'CSS Selectors',
    todayYouAreLearning: 'How to target specific HTML elements to apply styles.',
    whyItMatters: 'Mastering selectors allows you to write clean, efficient CSS without repeating yourself.',
    explanation: 'Selectors are the "who" of CSS. You can target elements by their tag name (h1), their class (.btn), or their unique ID (#header). You can also combine them to be more specific, like ".card h2" (all h2s inside a card).',
    analogy: 'Selectors are like a guest list for a party. You can invite "Everyone" (tag selector), "People wearing blue" (class selector), or "The Guest of Honor" (ID selector).',
    visualExplanation: 'Specificity is like a ranking system. An ID is more powerful than a class, and a class is more powerful than a tag.',
    codeExample: '/* Tag Selector */\np { color: gray; }\n\n/* Class Selector */\n.highlight { background: yellow; }\n\n/* ID Selector */\n#main-title { font-size: 32px; }',
    lineByLine: 'All paragraphs become gray. Any element with the "highlight" class gets a yellow background. The unique "main-title" gets a large font.',
    commonMistakes: ['Using IDs for everything (IDs should be unique!).', 'Making selectors too complex and hard to maintain.'],
    practice: 'Create a list of items and use a class to style only the "active" item.',
    challenge: 'What is a "Pseudo-class" in CSS? Give an example.',
    quiz: [
      {
        question: 'Which selector is used to target an element with a specific class?',
        options: ['#', '.', '@', '$'],
        correctIndex: 1,
        explanation: 'The dot (.) is used for classes, while the hash (#) is used for IDs.'
      }
    ],
    recap: 'Selectors are the bridge between your structure and your style.'
  },
  'flexbox-mastery': {
    id: 'flexbox-mastery',
    title: 'Flexbox Mastery',
    todayYouAreLearning: 'The most powerful way to align items in a row or column.',
    whyItMatters: 'Flexbox solved almost all the layout problems of the old web. It is essential for modern UI.',
    explanation: 'Flexbox is a one-dimensional layout model. You make a container a "flex container" with `display: flex`. You can then control how items are spaced (justify-content) and aligned (align-items).',
    analogy: 'Think of Flexbox like a flexible shelf. You can tell the items to sit at the start, the end, the middle, or spread out evenly to fill the space.',
    visualExplanation: 'The "Main Axis" is the direction items flow (usually horizontal). The "Cross Axis" is the perpendicular direction.',
    codeExample: '.container {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}',
    lineByLine: 'Enables flexbox. Spreads items to the edges. Centers items vertically.',
    commonMistakes: ['Confusing justify-content with align-items.', 'Forgetting that flexbox only affects direct children.'],
    practice: 'Build a navigation bar with a logo on the left and links on the right using Flexbox.',
    challenge: 'What does "flex-grow: 1" do to a flex item?',
    quiz: [
      {
        question: 'Which property aligns items along the main axis in Flexbox?',
        options: ['align-items', 'justify-content', 'flex-direction', 'display'],
        correctIndex: 1,
        explanation: 'justify-content handles spacing and alignment along the main axis (usually horizontal).'
      }
    ],
    recap: 'Flexbox makes complex layouts simple and responsive.'
  },
  'css-grid-layout': {
    id: 'css-grid-layout',
    title: 'CSS Grid Layout',
    todayYouAreLearning: 'Building complex two-dimensional layouts with rows and columns.',
    whyItMatters: 'Grid is the ultimate layout tool for entire page structures and complex components.',
    explanation: 'Unlike Flexbox (1D), Grid is 2D. You define a grid with `display: grid` and then specify your columns and rows using `grid-template-columns` and `grid-template-rows`. You can then place items exactly where you want them.',
    analogy: 'Grid is like a piece of graph paper. You define the columns and rows first, then you decide which boxes your content will occupy.',
    visualExplanation: 'Imagine a newspaper layout. You have a header across the top, a sidebar, and a main content area. Grid makes this easy to build.',
    codeExample: '.grid-container {\n  display: grid;\n  grid-template-columns: 1fr 2fr;\n  gap: 20px;\n}',
    lineByLine: 'Enables grid. Creates two columns: one taking 1 part and the other 2 parts of space. Adds 20px of space between items.',
    commonMistakes: ['Using Grid for simple one-row layouts where Flexbox would be easier.', 'Not using the "fr" (fractional) unit for flexible sizing.'],
    practice: 'Create a 3x3 grid of cards using CSS Grid.',
    challenge: 'What is the "grid-area" property used for?',
    quiz: [
      {
        question: 'How many dimensions does CSS Grid handle?',
        options: ['One (Rows only)', 'One (Columns only)', 'Two (Rows and Columns)', 'Three (3D space)'],
        correctIndex: 2,
        explanation: 'CSS Grid is a two-dimensional layout system, handling both rows and columns simultaneously.'
      }
    ],
    recap: 'Grid gives you total control over the layout of your web pages.'
  },
  'css-variables': {
    id: 'css-variables',
    title: 'CSS Variables',
    todayYouAreLearning: 'Using variables to store and reuse values across your CSS.',
    whyItMatters: 'Variables make your CSS easier to maintain. Change one color in one place, and it updates everywhere.',
    explanation: 'CSS Variables (Custom Properties) allow you to store values like colors, spacing, or font sizes. You define them with a double dash (--primary-color) and use them with the `var()` function.',
    analogy: 'Variables are like a "Find and Replace" tool that is always active. Instead of writing "#3498db" 50 times, you name it "--brand-blue" and use that name instead.',
    visualExplanation: 'Think of a theme switcher. By changing the values of a few variables, you can switch an entire site from Light Mode to Dark Mode.',
    codeExample: ':root {\n  --primary: #00ff00;\n}\n\n.btn {\n  background-color: var(--primary);\n}',
    lineByLine: '":root" is the highest level, making the variable global. We define "--primary". Then we use "var(--primary)" to apply it.',
    commonMistakes: ['Forgetting the double dash (--) when defining a variable.', 'Not providing a fallback value in the var() function.'],
    practice: 'Define a set of theme colors as variables and use them to style a simple page.',
    challenge: 'Can you change a CSS variable using JavaScript?',
    quiz: [
      {
        question: 'How do you access a CSS variable in your styles?',
        options: ['$', 'var()', '--', 'get()'],
        correctIndex: 1,
        explanation: 'The var() function is used to retrieve the value of a custom property.'
      }
    ],
    recap: 'Variables bring logic and maintainability to your stylesheets.'
  },
  'branching-merging': {
    id: 'branching-merging',
    title: 'Branching & Merging',
    todayYouAreLearning: 'How to work on new features without breaking the main code.',
    whyItMatters: 'Branching allows multiple developers to work on the same project simultaneously without interference.',
    explanation: 'A "Branch" is a separate version of your code. You create a branch to work on a feature, then "Merge" it back into the main branch once it is finished and tested.',
    analogy: 'Think of a tree. The trunk is the main code. A branch grows out to develop a new leaf. Once the leaf is grown, it becomes part of the tree\'s overall structure.',
    visualExplanation: 'Imagine a timeline that splits into two. You do work on the second line, then bring those changes back to the first line.',
    codeExample: 'git checkout -b feature-login\n// ... do work ...\ngit checkout main\ngit merge feature-login',
    lineByLine: 'Creates and switches to a new branch. Switches back to main. Combines the changes from the feature branch.',
    commonMistakes: ['Working directly on the "main" branch for new features.', 'Forgetting to pull the latest changes before merging.'],
    practice: 'Create a new branch called "style-updates" and make a small CSS change.',
    challenge: 'What is a "Merge Conflict" and how do you fix it?',
    quiz: [
      {
        question: 'What command is used to create and switch to a new branch?',
        options: ['git branch', 'git checkout -b', 'git merge', 'git push'],
        correctIndex: 1,
        explanation: 'The "-b" flag with "git checkout" creates a new branch and switches to it immediately.'
      }
    ],
    recap: 'Branching is the key to safe and collaborative development.'
  },
  'github-workflow': {
    id: 'github-workflow',
    title: 'GitHub Workflow',
    todayYouAreLearning: 'The professional process of contributing code via Pull Requests.',
    whyItMatters: 'This is the industry standard for how teams build software together.',
    explanation: 'The GitHub workflow involves: 1. Forking/Cloning a repo. 2. Creating a branch. 3. Committing changes. 4. Pushing to GitHub. 5. Opening a Pull Request (PR) for review. 6. Merging after approval.',
    analogy: 'It is like a suggestion box. You don\'t just change the company rules; you write your suggestion on a paper (PR), others discuss it, and if it is good, it becomes the new rule.',
    visualExplanation: 'A Pull Request is a "Compare and Review" screen where you can see exactly what lines of code changed.',
    codeExample: 'git push origin feature-branch\n// Then go to GitHub.com to open the PR',
    lineByLine: 'Sends your local branch to the remote server (GitHub).',
    commonMistakes: ['Pushing sensitive data (like API keys) to GitHub.', 'Writing vague commit messages like "fixed stuff".'],
    practice: 'Push your profile page project to a new GitHub repository.',
    challenge: 'What is the difference between "git push" and "git pull"?',
    quiz: [
      {
        question: 'What is a Pull Request?',
        options: ['A request to download code', 'A request to merge your changes into another branch', 'A way to delete a repository', 'A type of bug report'],
        correctIndex: 1,
        explanation: 'A Pull Request is a way to notify team members that you have completed a feature and want it reviewed and merged.'
      }
    ],
    recap: 'GitHub is more than hosting; it is a platform for collaboration and code quality.'
  },
  'collaboration-tools': {
    id: 'collaboration-tools',
    title: 'Collaboration Tools',
    todayYouAreLearning: 'Using Issues, Projects, and Wikis to manage a codebase.',
    whyItMatters: 'Coding is a team sport. These tools keep everyone organized and on the same page.',
    explanation: 'GitHub provides "Issues" for tracking bugs and tasks, "Projects" (Kanban boards) for managing workflow, and "Wikis" for documentation. Using these effectively makes you a great teammate.',
    analogy: 'Issues are like a "To-Do" list for the whole team. Projects are the "Status Board" that shows what is being worked on right now.',
    visualExplanation: 'A Kanban board has columns like "To Do", "In Progress", and "Done". You move cards (tasks) between them.',
    codeExample: '# Issue #42: Fix navigation bug on mobile\n// Reference issues in your commit messages!',
    lineByLine: 'Using the "#" followed by a number links your code change to a specific task or bug report.',
    commonMistakes: ['Not documenting your code or process.', 'Ignoring open issues or PR comments.'],
    practice: 'Create an "Issue" in your GitHub repo for a feature you want to add later.',
    challenge: 'What is a "README.md" file and why is it important?',
    quiz: [
      {
        question: 'Which tool is best for tracking bugs in a project?',
        options: ['Pull Requests', 'Issues', 'Wikis', 'Actions'],
        correctIndex: 1,
        explanation: 'Issues are designed to track tasks, enhancements, and bugs.'
      }
    ],
    recap: 'Great developers communicate as well as they code.'
  },
  'js-variables': {
    id: 'js-variables',
    title: 'JavaScript Variables',
    todayYouAreLearning: 'Storing and managing data using let, const, and var.',
    whyItMatters: 'Variables are the containers for all the data your app will use.',
    explanation: 'In modern JS, we use `const` for values that don\'t change and `let` for values that do. We avoid `var` because it has confusing rules. Variables can store strings, numbers, booleans, and more.',
    analogy: 'A variable is like a labeled box. You put something inside, and you can use the label to find it later.',
    visualExplanation: 'Think of a score in a game. It starts at 0 (let score = 0) and increases as you play (score = score + 10).',
    codeExample: 'const name = "Alice";\nlet score = 0;\nscore = 10;',
    lineByLine: 'Defines a constant that cannot be changed. Defines a variable that can be updated. Updates the value of score.',
    commonMistakes: ['Using "const" for a value you need to change later.', 'Forgetting to use a keyword (let/const) when defining a variable.'],
    practice: 'Create variables for your name, age, and whether you are a student.',
    challenge: 'What happens if you try to reassign a "const" variable?',
    quiz: [
      {
        question: 'Which keyword should you use for a value that will NOT change?',
        options: ['let', 'var', 'const', 'set'],
        correctIndex: 2,
        explanation: 'const (constant) is for values that remain the same throughout the program.'
      }
    ],
    recap: 'Choose the right container for your data to write safer code.'
  },
  'js-functions': {
    id: 'js-functions',
    title: 'JavaScript Functions',
    todayYouAreLearning: 'Writing reusable blocks of code to perform specific tasks.',
    whyItMatters: 'Functions allow you to write code once and use it many times, making your app modular.',
    explanation: 'A function is a set of instructions that you "call" by name. It can take "parameters" (inputs) and "return" a result (output).',
    analogy: 'A function is like a blender. You put in fruit (input), press a button (call the function), and get a smoothie (output).',
    visualExplanation: 'Imagine a "Like" button. Every time it is clicked, the same "incrementLike" function runs.',
    codeExample: 'function greet(name) {\n  return "Hello, " + name;\n}\n\nconst message = greet("Bob");',
    lineByLine: 'Defines a function named greet that takes one input. Returns a combined string. Calls the function and stores the result.',
    commonMistakes: ['Forgetting to "return" a value from a function.', 'Confusing parameters (placeholders) with arguments (actual values).'],
    practice: 'Write a function that takes two numbers and returns their sum.',
    challenge: 'What is an "Arrow Function" in JavaScript?',
    quiz: [
      {
        question: 'What do we call the inputs passed into a function?',
        options: ['Outputs', 'Returns', 'Parameters', 'Variables'],
        correctIndex: 2,
        explanation: 'Parameters are the placeholders defined in the function, and arguments are the actual values passed in.'
      }
    ],
    recap: 'Functions are the building blocks of logic in your application.'
  },
  'js-objects-arrays': {
    id: 'js-objects-arrays',
    title: 'Objects & Arrays',
    todayYouAreLearning: 'Managing collections of data using lists and key-value pairs.',
    whyItMatters: 'Most real-world data (like user profiles or product lists) is stored in objects and arrays.',
    explanation: 'An Array is an ordered list of items `[1, 2, 3]`. An Object is a collection of properties `{ name: "Alice", age: 25 }`. We use them together to build complex data structures.',
    analogy: 'An Array is like a shopping list (items in order). An Object is like a contact card (specific info for specific labels).',
    visualExplanation: 'Think of a list of users. Each user is an Object, and the whole list is an Array of those Objects.',
    codeExample: 'const fruits = ["apple", "banana"];\nconst user = {\n  name: "Alice",\n  age: 25\n};',
    lineByLine: 'Creates a list of strings. Creates an object with two properties: name and age.',
    commonMistakes: ['Using an object when an ordered list (array) is needed.', 'Forgetting commas between properties in an object.'],
    practice: 'Create an object representing your favorite movie with title, year, and director.',
    challenge: 'How do you add a new item to the end of an array?',
    quiz: [
      {
        question: 'Which data structure uses key-value pairs?',
        options: ['Array', 'Object', 'String', 'Boolean'],
        correctIndex: 1,
        explanation: 'Objects store data in pairs of keys (labels) and values.'
      }
    ],
    recap: 'Mastering data structures is essential for handling real-world information.'
  },
  'js-control-flow': {
    id: 'js-control-flow',
    title: 'Control Flow',
    todayYouAreLearning: 'Making decisions in your code using if/else and loops.',
    whyItMatters: 'Control flow allows your app to react differently to different situations.',
    explanation: 'We use `if` statements to run code only when a condition is true. We use `loops` (like for/while) to run the same code multiple times.',
    analogy: 'Control flow is like a "Choose Your Own Adventure" book. If you have a key, turn to page 10. If not, turn to page 20.',
    visualExplanation: 'Imagine a login screen. IF the password is correct, show the dashboard. ELSE, show an error message.',
    codeExample: 'if (age >= 18) {\n  console.log("Welcome!");\n} else {\n  console.log("Access Denied");\n}',
    lineByLine: 'Checks if age is 18 or older. Runs if true. Runs if false.',
    commonMistakes: ['Forgetting the "else" block when needed.', 'Creating an "infinite loop" that crashes the browser.'],
    practice: 'Write a loop that prints the numbers 1 to 10 to the console.',
    challenge: 'What is a "Switch" statement and when should you use it?',
    quiz: [
      {
        question: 'Which statement is used to repeat code multiple times?',
        options: ['if', 'else', 'for', 'const'],
        correctIndex: 2,
        explanation: 'A "for" loop is used to iterate over a block of code a specific number of times.'
      }
    ],
    recap: 'Logic and repetition are what make programs powerful.'
  },
  'dom-selection': {
    id: 'dom-selection',
    title: 'DOM Selection',
    todayYouAreLearning: 'How to find and target HTML elements using JavaScript.',
    whyItMatters: 'To change a website with code, you first have to tell JavaScript exactly which part to change.',
    explanation: 'The DOM (Document Object Model) is how JS sees your HTML. We use methods like `querySelector` and `getElementById` to "grab" elements so we can manipulate them.',
    analogy: 'DOM selection is like using a remote control. You have to point it at the right device (element) before you can change the channel (style/content).',
    visualExplanation: 'Think of the DOM as a map of your house. Selection is like saying "Go to the kitchen" or "Find the blue chair".',
    codeExample: 'const title = document.querySelector("h1");\nconst btn = document.getElementById("submit-btn");',
    lineByLine: 'Finds the first <h1> tag on the page. Finds the specific element with the ID "submit-btn".',
    commonMistakes: ['Trying to select an element that doesn\'t exist yet.', 'Confusing querySelector (uses CSS syntax) with getElementById.'],
    practice: 'Select the main heading of your profile page and log it to the console.',
    challenge: 'What is the difference between querySelector and querySelectorAll?',
    quiz: [
      {
        question: 'Which method can select an element using any CSS selector?',
        options: ['getElementById', 'querySelector', 'getElementsByClassName', 'select()'],
        correctIndex: 1,
        explanation: 'querySelector is the most versatile selection method as it accepts any valid CSS selector string.'
      }
    ],
    recap: 'Selection is the first step to making your web pages interactive.'
  },
  'event-listeners': {
    id: 'event-listeners',
    title: 'Event Listeners',
    todayYouAreLearning: 'Making your website react to user actions like clicks and typing.',
    whyItMatters: 'Events are what make a website "interactive" rather than just a static document.',
    explanation: 'An Event Listener "listens" for a specific action (like a "click") on an element and runs a function when it happens.',
    analogy: 'An event listener is like a doorbell. It waits silently until someone presses it (the event), then it rings (runs the function).',
    visualExplanation: 'Imagine a "Dark Mode" toggle. When you click it, an event listener triggers the code that changes the background color.',
    codeExample: 'btn.addEventListener("click", function() {\n  alert("Button Clicked!");\n});',
    lineByLine: 'Attaches a listener to the button. Specifies the "click" event. The function to run when the click happens.',
    commonMistakes: ['Forgetting to select the element before adding the listener.', 'Typing the event name wrong (e.g., "onclick" instead of "click").'],
    practice: 'Add a click listener to a button that changes the text of a paragraph.',
    challenge: 'What is "Event Bubbling" in JavaScript?',
    quiz: [
      {
        question: 'Which method is used to attach an event handler to an element?',
        options: ['attachEvent()', 'addEventListener()', 'listen()', 'onClick()'],
        correctIndex: 1,
        explanation: 'addEventListener is the standard modern way to handle events in JavaScript.'
      }
    ],
    recap: 'Events turn your users from passive readers into active participants.'
  },
  'dynamic-ui-updates': {
    id: 'dynamic-ui-updates',
    title: 'Dynamic UI Updates',
    todayYouAreLearning: 'Changing HTML content and CSS styles on the fly with JavaScript.',
    whyItMatters: 'This is how modern apps update without refreshing the whole page.',
    explanation: 'Once you select an element, you can change its text (`innerText`), its HTML (`innerHTML`), or its styles (`style.color`). You can also add or remove CSS classes.',
    analogy: 'Dynamic updates are like a digital scoreboard. The board stays the same, but the numbers change instantly as points are scored.',
    visualExplanation: 'Think of a "Loading" spinner. When you click a button, JS adds a "loading" class that makes the spinner appear.',
    codeExample: 'const el = document.querySelector(".box");\nel.innerText = "Updated!";\nel.style.backgroundColor = "blue";',
    lineByLine: 'Selects the element. Changes the text content. Changes the CSS background color directly.',
    commonMistakes: ['Overusing inline styles instead of toggling CSS classes.', 'Using innerHTML with untrusted user input (security risk!).'],
    practice: 'Create a button that changes its own color every time it is clicked.',
    challenge: 'What is the difference between innerText and textContent?',
    quiz: [
      {
        question: 'Which property is used to change the CSS of an element directly?',
        options: ['css', 'style', 'attr', 'class'],
        correctIndex: 1,
        explanation: 'The .style property allows you to access and modify the inline CSS of an element.'
      }
    ],
    recap: 'JavaScript gives you total control over the appearance and content of your page.'
  },
  'local-storage-api': {
    id: 'local-storage-api',
    title: 'Local Storage API',
    todayYouAreLearning: 'Saving data in the user\'s browser so it persists after a refresh.',
    whyItMatters: 'Local storage allows you to build apps that "remember" user settings or data without a backend.',
    explanation: 'LocalStorage is a simple key-value store in the browser. Data stays there even if you close the tab or restart the computer. We use `setItem` to save and `getItem` to retrieve.',
    analogy: 'LocalStorage is like a sticky note on the user\'s monitor. Your app writes something down, and it is still there the next time the user looks.',
    visualExplanation: 'Think of a "Dark Mode" preference. If the user picks dark mode, you save that choice in LocalStorage so the site stays dark on their next visit.',
    codeExample: 'localStorage.setItem("theme", "dark");\nconst theme = localStorage.getItem("theme");',
    lineByLine: 'Saves the value "dark" under the key "theme". Retrieves the value stored under "theme".',
    commonMistakes: ['Trying to store complex objects directly (you must use JSON.stringify!).', 'Exceeding the storage limit (usually around 5MB).'],
    practice: 'Save the user\'s name in LocalStorage and display it when they return to the page.',
    challenge: 'How do you remove an item from LocalStorage?',
    quiz: [
      {
        question: 'Does data in LocalStorage disappear when the browser is closed?',
        options: ['Yes, always', 'No, it persists', 'Only if the user is in Incognito mode', 'Only on mobile devices'],
        correctIndex: 1,
        explanation: 'LocalStorage is designed for persistent storage that survives browser restarts.'
      }
    ],
    recap: 'LocalStorage is a powerful tool for building stateful frontend applications.'
  },
  'async-js-promises': {
    id: 'async-js-promises',
    title: 'Async JS & Promises',
    todayYouAreLearning: 'Handling tasks that take time, like fetching data from a server.',
    whyItMatters: 'The web is asynchronous. You can\'t wait for a slow server to finish before showing the rest of the page.',
    explanation: 'A Promise is an object representing the eventual completion (or failure) of an asynchronous operation. It can be "Pending", "Fulfilled" (success), or "Rejected" (error).',
    analogy: 'A Promise is like ordering a burger. You get a buzzer (the promise). You go sit down (continue other tasks). When the buzzer goes off, you get your burger (fulfillment).',
    visualExplanation: 'Imagine a timeline where a "Fetch" starts, other code runs, and then the "Fetch" finishes and updates the UI.',
    codeExample: 'const myPromise = new Promise((resolve, reject) => {\n  setTimeout(() => resolve("Success!"), 1000);\n});\n\nmyPromise.then(data => console.log(data));',
    lineByLine: 'Creates a new promise. Simulates a 1-second delay then succeeds. Runs when the promise is fulfilled.',
    commonMistakes: ['Forgetting to handle the "reject" (error) case.', 'Falling into "Callback Hell" instead of using Promises or Async/Await.'],
    practice: 'Create a promise that resolves after 2 seconds and logs a message.',
    challenge: 'What is the difference between .then() and async/await?',
    quiz: [
      {
        question: 'What are the three states of a Promise?',
        options: ['Start, Middle, End', 'Pending, Fulfilled, Rejected', 'Open, Closed, Waiting', 'Active, Inactive, Error'],
        correctIndex: 1,
        explanation: 'Promises start as Pending and eventually settle into either Fulfilled or Rejected.'
      }
    ],
    recap: 'Asynchronous programming keeps your apps responsive and fast.'
  },
  'fetch-api-basics': {
    id: 'fetch-api-basics',
    title: 'Fetch API Basics',
    todayYouAreLearning: 'How to request data from external APIs and use it in your app.',
    whyItMatters: 'Most modern apps get their data (weather, news, user info) from external servers via APIs.',
    explanation: 'The `fetch()` function allows you to make HTTP requests. It returns a Promise that resolves to the Response object. We usually convert this response to JSON.',
    analogy: 'Fetch is like a waiter. You tell the waiter what you want (the URL), they go to the kitchen (the server), and bring back your food (the data).',
    visualExplanation: 'Think of a weather app. It "fetches" the current temperature from a weather server and displays it on your screen.',
    codeExample: 'fetch("https://api.example.com/data")\n  .then(response => response.json())\n  .then(data => console.log(data));',
    lineByLine: 'Starts the request to the URL. Converts the raw response to a usable JSON object. Uses the final data.',
    commonMistakes: ['Forgetting that fetch() only rejects on network errors, not 404s.', 'Not handling the second .then() correctly.'],
    practice: 'Use fetch to get data from a public API (like JSONPlaceholder) and log it.',
    challenge: 'How do you send data (a POST request) using fetch?',
    quiz: [
      {
        question: 'What format is most commonly used for API data today?',
        options: ['XML', 'HTML', 'JSON', 'CSV'],
        correctIndex: 2,
        explanation: 'JSON (JavaScript Object Notation) is the standard format for data exchange on the web.'
      }
    ],
    recap: 'The Fetch API is your gateway to the world of external data.'
  },
  'es6-modules': {
    id: 'es6-modules',
    title: 'ES6 Modules',
    todayYouAreLearning: 'Organizing your code into multiple files using import and export.',
    whyItMatters: 'As your app grows, putting everything in one file becomes impossible to manage.',
    explanation: 'Modules allow you to split your code into reusable pieces. You `export` functions or variables from one file and `import` them into another.',
    analogy: 'Modules are like LEGO bricks. Each brick is separate, but they fit together to build a large structure.',
    visualExplanation: 'Imagine a "utils.js" file with helper functions. You import only the ones you need into your "main.js".',
    codeExample: '// math.js\nexport const add = (a, b) => a + b;\n\n// main.js\nimport { add } from "./math.js";',
    lineByLine: 'Makes the function available to other files. Brings the function into the current file.',
    commonMistakes: ['Forgetting the "./" when importing local files.', 'Confusing "default exports" with "named exports".'],
    practice: 'Create a module that exports a greeting function and import it into another file.',
    challenge: 'What is the benefit of using "import type" in TypeScript?',
    quiz: [
      {
        question: 'Which keyword is used to make a function available to other files?',
        options: ['import', 'export', 'require', 'module'],
        correctIndex: 1,
        explanation: 'The "export" keyword exposes code to be used in other modules.'
      }
    ],
    recap: 'Modules keep your codebase clean, organized, and maintainable.'
  },
  'responsive-design-principles': {
    id: 'responsive-design-principles',
    title: 'Responsive Design Principles',
    todayYouAreLearning: 'The core concepts of building websites that work on any screen size.',
    whyItMatters: 'More people browse the web on mobile than on desktop. Your site must look great on both.',
    explanation: 'Responsive design uses fluid grids, flexible images, and media queries to adapt the layout. The goal is "One site, every device".',
    analogy: 'Responsive design is like water. If you put water into a cup, it becomes the cup. If you put it into a bottle, it becomes the bottle.',
    visualExplanation: 'Think of a 3-column layout on desktop that stacks into a 1-column layout on mobile.',
    codeExample: '<meta name="viewport" content="width=device-width, initial-scale=1.0">',
    lineByLine: 'This tag is essential! It tells the browser to match the screen width and not zoom out.',
    commonMistakes: ['Using fixed widths (like width: 1200px) instead of percentages or relative units.', 'Forgetting to test on real mobile devices.'],
    practice: 'Resize your browser window and see how your favorite websites adapt (or don\'t).',
    challenge: 'What are "Breakpoints" in responsive design?',
    quiz: [
      {
        question: 'What is the main goal of responsive design?',
        options: ['To make sites faster', 'To make sites work on all screen sizes', 'To add more animations', 'To use less CSS'],
        correctIndex: 1,
        explanation: 'Responsive design ensures a good user experience regardless of the device being used.'
      }
    ],
    recap: 'Responsiveness is a requirement, not a feature, in modern web development.'
  },
  'media-queries-deep-dive': {
    id: 'media-queries-deep-dive',
    title: 'Media Queries Deep Dive',
    todayYouAreLearning: 'Using CSS to apply different styles based on screen width.',
    whyItMatters: 'Media queries are the "If/Else" of CSS. They allow you to change styles for mobile, tablet, and desktop.',
    explanation: 'A media query `@media` wraps a block of CSS. That CSS only applies if the condition (like `max-width: 600px`) is met.',
    analogy: 'Media queries are like a dress code. If it is a wedding (mobile), wear a suit (stack columns). If it is a beach (desktop), wear shorts (side-by-side).',
    visualExplanation: 'Imagine a sidebar that is visible on desktop but hidden behind a "hamburger menu" on mobile.',
    codeExample: '@media (max-width: 768px) {\n  .sidebar {\n    display: none;\n  }\n}',
    lineByLine: 'Starts the media query for screens 768px or smaller. Hides the sidebar element.',
    commonMistakes: ['Using too many breakpoints, making the CSS hard to manage.', 'Not using a logical order (like mobile-first).'],
    practice: 'Write a media query that changes the background color of the page when the screen is small.',
    challenge: 'What is the difference between "min-width" and "max-width" in media queries?',
    quiz: [
      {
        question: 'Which CSS rule is used to create a media query?',
        options: ['@query', '@media', '@responsive', '@screen'],
        correctIndex: 1,
        explanation: 'The @media rule is the standard way to apply conditional CSS based on device characteristics.'
      }
    ],
    recap: 'Media queries give you precise control over your layout across devices.'
  },
  'mobile-first-strategy': {
    id: 'mobile-first-strategy',
    title: 'Mobile-First Strategy',
    todayYouAreLearning: 'Why and how to design for the smallest screens first.',
    whyItMatters: 'Mobile-first leads to cleaner code, faster performance, and a better focus on core content.',
    explanation: 'In mobile-first, you write the "default" CSS for mobile (no media queries). Then, you use `min-width` media queries to add complexity as the screen gets larger.',
    analogy: 'It is like packing a suitcase. Start with the essentials (mobile). If you have a bigger suitcase (desktop), you can add more items.',
    visualExplanation: 'Think of a simple list on mobile. As the screen grows, that list expands into a detailed table.',
    codeExample: '.card { width: 100%; } /* Mobile default */\n@media (min-width: 1024px) {\n  .card { width: 30%; }\n}',
    lineByLine: 'Default style for all screens (starting with mobile). Overrides the width only for large screens.',
    commonMistakes: ['Designing for desktop first and then trying to "shrink" it for mobile.', 'Overloading mobile users with unnecessary images or features.'],
    practice: 'Refactor a small project to use mobile-first CSS.',
    challenge: 'Why is mobile-first better for performance?',
    quiz: [
      {
        question: 'In mobile-first design, which media query type is most common?',
        options: ['max-width', 'min-width', 'orientation', 'resolution'],
        correctIndex: 1,
        explanation: 'Mobile-first uses min-width to "layer on" styles as the screen size increases.'
      }
    ],
    recap: 'Mobile-first is a mindset that prioritizes the most important user experience.'
  },
  'react-components-props': {
    id: 'react-components-props',
    title: 'React Components & Props',
    todayYouAreLearning: 'Building reusable UI pieces and passing data between them.',
    whyItMatters: 'Components are the heart of React. They allow you to build complex UIs from small, independent parts.',
    explanation: 'A Component is a JavaScript function that returns HTML (JSX). "Props" (short for properties) are inputs you pass into components to make them dynamic.',
    analogy: 'A Component is like a recipe. Props are the ingredients. You use the same recipe, but different ingredients make a different dish.',
    visualExplanation: 'Imagine a "UserCard" component. You pass in a name and photo as props to show different users with the same layout.',
    codeExample: 'function Welcome(props) {\n  return <h1>Hello, {props.name}</h1>;\n}\n\n<Welcome name="Alice" />',
    lineByLine: 'Defines a component that accepts props. Uses a prop inside the JSX. Renders the component with a specific prop value.',
    commonMistakes: ['Forgetting that props are read-only (you cannot change them inside the component).', 'Not capitalizing component names (React requires this!).'],
    practice: 'Create a "Button" component that takes a "label" prop.',
    challenge: 'What is "Prop Drilling" and how can it be avoided?',
    quiz: [
      {
        question: 'What are "Props" in React?',
        options: ['Internal component state', 'Inputs passed to a component', 'CSS styles', 'HTML attributes'],
        correctIndex: 1,
        explanation: 'Props are the mechanism for passing data from a parent component to a child component.'
      }
    ],
    recap: 'Components and props make your UI modular and data-driven.'
  },
  'react-state-hooks': {
    id: 'react-state-hooks',
    title: 'React State & Hooks',
    todayYouAreLearning: 'Managing data that changes over time using the useState hook.',
    whyItMatters: 'State is what makes React "reactive". When state changes, React automatically updates the UI.',
    explanation: 'The `useState` hook gives you a state variable and a function to update it. This is how you handle things like form inputs, counters, or toggles.',
    analogy: 'State is like the current score in a basketball game. It changes constantly, and the scoreboard (the UI) must update immediately.',
    visualExplanation: 'Think of a "Like" button. When clicked, the `count` state increases, and the number on the screen changes.',
    codeExample: 'const [count, setCount] = useState(0);\n\n<button onClick={() => setCount(count + 1)}>\n  {count}\n</button>',
    lineByLine: 'Initializes state at 0. Defines the variable and the updater function. Updates state when the button is clicked.',
    commonMistakes: ['Trying to update state directly (e.g., count = 5) instead of using the setter function.', 'Using hooks inside loops or conditions (they must be at the top level).'],
    practice: 'Build a simple counter component with "Increment" and "Decrement" buttons.',
    challenge: 'What is the "useEffect" hook used for?',
    quiz: [
      {
        question: 'Which hook is used to add state to a functional component?',
        options: ['useEffect', 'useContext', 'useState', 'useReducer'],
        correctIndex: 2,
        explanation: 'useState is the primary hook for managing local component state.'
      }
    ],
    recap: 'State is the "memory" of your components.'
  },
  'react-handling-events': {
    id: 'react-handling-events',
    title: 'Handling Events in React',
    todayYouAreLearning: 'Connecting user actions to your React logic.',
    whyItMatters: 'React events are similar to DOM events but have a cleaner, more consistent syntax.',
    explanation: 'In React, we pass functions as event handlers directly to elements using camelCase names like `onClick` or `onChange`.',
    analogy: 'It is like a light switch. You don\'t have to wire the whole house; you just connect the switch (the event) to the light (the function).',
    visualExplanation: 'Imagine a search bar. Every time you type (onChange), a function runs to filter the list below.',
    codeExample: '<button onClick={handleClick}>Click Me</button>',
    lineByLine: 'Attaches the handleClick function to the click event of the button.',
    commonMistakes: ['Calling the function immediately (onClick={handleClick()}) instead of passing it (onClick={handleClick}).', 'Forgetting to prevent default behavior in form submissions.'],
    practice: 'Create a form that logs the input value to the console when submitted.',
    challenge: 'How do you pass an argument to an event handler in React?',
    quiz: [
      {
        question: 'How are event names written in React JSX?',
        options: ['onclick', 'onClick', 'on-click', 'click'],
        correctIndex: 1,
        explanation: 'React uses camelCase for event handlers (e.g., onClick, onSubmit).'
      }
    ],
    recap: 'React events bridge the gap between user interaction and your app\'s logic.'
  },
  'react-lists-keys': {
    id: 'react-lists-keys',
    title: 'Lists & Keys',
    todayYouAreLearning: 'Rendering multiple components from an array of data.',
    whyItMatters: 'Most apps display lists of things (emails, products, posts). React makes this efficient.',
    explanation: 'We use the `.map()` method to transform an array of data into an array of JSX elements. Each element needs a unique `key` prop so React can track it.',
    analogy: 'Keys are like social security numbers for your components. They help React identify which specific item in a list changed, was added, or removed.',
    visualExplanation: 'Think of a "To-Do List". Each task is a component. If you delete one, React uses the key to know exactly which one to remove from the screen.',
    codeExample: 'const items = ["Apple", "Banana"];\n{items.map(item => <li key={item}>{item}</li>)}',
    lineByLine: 'Iterates over the array. Returns a list item for each fruit. Provides a unique key for React.',
    commonMistakes: ['Forgetting the "key" prop, which leads to performance issues and bugs.', 'Using the array index as a key (only do this as a last resort).'],
    practice: 'Render a list of your favorite books from an array of objects.',
    challenge: 'Why is using a unique ID better than using the array index as a key?',
    quiz: [
      {
        question: 'Which array method is most commonly used to render lists in React?',
        options: ['forEach', 'filter', 'map', 'reduce'],
        correctIndex: 2,
        explanation: 'map() is ideal because it returns a new array of JSX elements.'
      }
    ],
    recap: 'Lists and keys are the foundation of dynamic, data-driven interfaces.'
  },
  'react-conditional-rendering': {
    id: 'react-conditional-rendering',
    title: 'Conditional Rendering',
    todayYouAreLearning: 'Showing or hiding parts of your UI based on certain conditions.',
    whyItMatters: 'Your app needs to show different things at different times (e.g., "Login" vs "Logout" buttons).',
    explanation: 'We use standard JavaScript logic like `if` statements, ternary operators (`? :`), or logical AND (`&&`) to decide what JSX to render.',
    analogy: 'Conditional rendering is like a "Members Only" sign. If you have a membership, you see the club. If not, you see the sign.',
    visualExplanation: 'Imagine a "Loading..." state. If data is still fetching, show a spinner. Once it is done, show the actual content.',
    codeExample: '{isLoggedIn ? <LogoutBtn /> : <LoginBtn />}',
    lineByLine: 'Checks the isLoggedIn variable. Renders Logout if true. Renders Login if false.',
    commonMistakes: ['Making the logic too complex inside the JSX (better to move it to a variable or function).', 'Forgetting that 0 is "falsy" and might accidentally render a 0 on the screen.'],
    practice: 'Create a component that shows a "Welcome" message only if a "name" prop is provided.',
    challenge: 'How do you prevent a component from rendering at all?',
    quiz: [
      {
        question: 'Which operator is often used for "if this, then show that" logic in React?',
        options: ['||', '&&', '??', '=='],
        correctIndex: 1,
        explanation: 'The logical AND (&&) operator is a concise way to render an element only if a condition is true.'
      }
    ],
    recap: 'Conditional rendering makes your UI adaptive and intelligent.'
  },
  'react-useeffect-hook': {
    id: 'react-useeffect-hook',
    title: 'The useEffect Hook',
    todayYouAreLearning: 'Handling side effects like data fetching and manual DOM updates.',
    whyItMatters: 'useEffect is how you synchronize your component with external systems (like an API or the browser window).',
    explanation: 'The `useEffect` hook runs after every render by default. You can use the "dependency array" to control when it runs (e.g., only once on mount, or when a specific variable changes).',
    analogy: 'useEffect is like a "Post-it" note you leave for yourself. "After you finish cleaning the room (rendering), remember to take out the trash (fetch data)".',
    visualExplanation: 'Imagine a chat app. When the component "mounts", you connect to the chat server. When it "unmounts", you disconnect.',
    codeExample: 'useEffect(() => {\n  console.log("Component mounted!");\n  return () => console.log("Cleanup!");\n}, []);',
    lineByLine: 'Defines the effect function. The code to run. An optional cleanup function. Empty array means it only runs once.',
    commonMistakes: ['Forgetting the dependency array, causing an infinite loop.', 'Not cleaning up subscriptions or timers, leading to memory leaks.'],
    practice: 'Use useEffect to fetch data from an API when the component first loads.',
    challenge: 'What happens if you omit the dependency array entirely?',
    quiz: [
      {
        question: 'When does an effect with an empty dependency array [] run?',
        options: ['Every render', 'Only on the first render', 'Never', 'Only when state changes'],
        correctIndex: 1,
        explanation: 'An empty array tells React that the effect doesn\'t depend on any values from props or state, so it only runs once.'
      }
    ],
    recap: 'useEffect is the bridge between React and the outside world.'
  },
  'react-custom-hooks': {
    id: 'react-custom-hooks',
    title: 'Custom Hooks',
    todayYouAreLearning: 'Extracting component logic into reusable functions.',
    whyItMatters: 'Custom hooks allow you to share logic between components without duplicating code.',
    explanation: 'A custom hook is just a JavaScript function whose name starts with "use" and that can call other hooks. It is a powerful way to organize complex logic.',
    analogy: 'A custom hook is like a specialized tool you built yourself. Instead of carrying all your loose tools (useState, useEffect) everywhere, you put them in a custom toolbox.',
    visualExplanation: 'Think of a "useWindowSize" hook. Any component can use it to get the current width and height of the browser.',
    codeExample: 'function useCounter() {\n  const [count, setCount] = useState(0);\n  const increment = () => setCount(count + 1);\n  return { count, increment };\n}',
    lineByLine: 'Defines the custom hook. Uses built-in state. Returns the state and the logic to update it.',
    commonMistakes: ['Not starting the name with "use" (React won\'t recognize it as a hook).', 'Putting too much unrelated logic into a single custom hook.'],
    practice: 'Create a "useToggle" hook that manages a boolean state (true/false).',
    challenge: 'Can a custom hook return JSX?',
    quiz: [
      {
        question: 'What is the naming convention for custom hooks?',
        options: ['handleSomething', 'getSomething', 'useSomething', 'customSomething'],
        correctIndex: 2,
        explanation: 'React requires custom hooks to start with the prefix "use" to enforce hook rules.'
      }
    ],
    recap: 'Custom hooks are the ultimate tool for code reuse in React.'
  },
  'react-context-api': {
    id: 'react-context-api',
    title: 'React Context API',
    todayYouAreLearning: 'Managing global state without passing props through every level.',
    whyItMatters: 'Context solves the problem of "Prop Drilling" for data that many components need (like theme or user info).',
    explanation: 'Context provides a way to share values between components without having to explicitly pass a prop through every level of the tree.',
    analogy: 'Context is like a radio broadcast. Any component that "tunes in" (uses the context) can hear the message, regardless of where they are in the house.',
    visualExplanation: 'Imagine a "Dark Mode" setting. Instead of passing `theme` to every single component, you put it in Context and any component can grab it.',
    codeExample: 'const ThemeContext = createContext("light");\n\nfunction App() {\n  return (\n    <ThemeContext.Provider value="dark">\n      <Toolbar />\n    </ThemeContext.Provider>\n  );\n}',
    lineByLine: 'Creates the context object. Wraps the app in a Provider. Sets the value that all children can access.',
    commonMistakes: ['Using Context for state that only one or two components need (props are better for that).', 'Forgetting to wrap your app in the Provider.'],
    practice: 'Create a UserContext to store and display a username across different components.',
    challenge: 'What is the difference between Context and Redux?',
    quiz: [
      {
        question: 'What problem does the Context API primarily solve?',
        options: ['Slow performance', 'Prop drilling', 'Complex CSS', 'API fetching'],
        correctIndex: 1,
        explanation: 'Context allows data to be accessed by any component in the tree without passing props manually.'
      }
    ],
    recap: 'Context is perfect for global data that "everyone needs to know".'
  },
  'react-performance-memo': {
    id: 'react-performance-memo',
    title: 'React Performance & Memo',
    todayYouAreLearning: 'Optimizing your app to prevent unnecessary re-renders.',
    whyItMatters: 'As apps get larger, small inefficiencies can lead to a sluggish user experience.',
    explanation: 'We use `React.memo` to prevent a component from re-rendering if its props haven\'t changed. We use `useMemo` and `useCallback` to cache values and functions.',
    analogy: 'Memoization is like writing down the answer to a hard math problem. If someone asks you again, you don\'t do the math; you just read the answer from your paper.',
    visualExplanation: 'Think of a heavy list component. If the parent updates but the list data is the same, `React.memo` tells React: "Don\'t bother re-drawing this list".',
    codeExample: 'const MemoizedComponent = React.memo(function MyComponent(props) {\n  /* render using props */\n});',
    lineByLine: 'Wraps the component in memo. React will now skip rendering if props are identical.',
    commonMistakes: ['Using memoization everywhere (it has its own cost!). Only use it when you actually have a performance problem.', 'Forgetting that objects and arrays are "new" on every render unless memoized.'],
    practice: 'Use React.memo on a component and see if it stops re-rendering when parent state changes.',
    challenge: 'What is the "Profiler" tool in React DevTools?',
    quiz: [
      {
        question: 'Which hook is used to memoize a function?',
        options: ['useMemo', 'useCallback', 'useEffect', 'useRef'],
        correctIndex: 1,
        explanation: 'useCallback returns a memoized version of the callback that only changes if one of the dependencies has changed.'
      }
    ],
    recap: 'Optimization is about doing less work, more efficiently.'
  },
  'react-routing-basics': {
    id: 'react-routing-basics',
    title: 'React Routing Basics',
    todayYouAreLearning: 'Navigating between different pages in a Single Page Application (SPA).',
    whyItMatters: 'Users expect to use the back button and have unique URLs for different parts of your app.',
    explanation: 'React Router is the standard library for routing. It allows you to define "Routes" that render different components based on the URL path.',
    analogy: 'Routing is like a GPS. You tell it where you want to go (/about, /contact), and it shows you the right view without you having to buy a new car (refresh the page).',
    visualExplanation: 'Think of a dashboard. Clicking "Settings" changes the main view to the settings component and updates the URL to /settings.',
    codeExample: '<BrowserRouter>\n  <Routes>\n    <Route path="/" element={<Home />} />\n    <Route path="/about" element={<About />} />\n  </Routes>\n</BrowserRouter>',
    lineByLine: 'The wrapper for routing. Container for all routes. Defines a specific path and the component to show.',
    commonMistakes: ['Using standard <a> tags instead of React Router\'s <Link> component (which causes a full page refresh).', 'Forgetting to handle "404 Not Found" routes.'],
    practice: 'Set up a basic 2-page app with "Home" and "About" using React Router.',
    challenge: 'How do you handle dynamic parameters like /user/:id in React Router?',
    quiz: [
      {
        question: 'Which component should you use for navigation in React Router?',
        options: ['<a>', '<Nav>', '<Link>', '<Route>'],
        correctIndex: 2,
        explanation: 'The <Link> component allows for navigation without a full page reload.'
      }
    ],
    recap: 'Routing turns your single-page app into a multi-page experience.'
  },
  'react-forms-validation': {
    id: 'react-forms-validation',
    title: 'React Forms & Validation',
    todayYouAreLearning: 'Building secure and user-friendly forms with real-time feedback.',
    whyItMatters: 'Forms are how users interact with your data. Good validation prevents bad data and improves UX.',
    explanation: 'We use "Controlled Components" where React state manages the input values. We add validation logic to check for errors before the user submits.',
    analogy: 'Form validation is like a bouncer at a club. If you don\'t have an ID (valid email) or you\'re too young (password too short), you can\'t get in.',
    visualExplanation: 'Imagine a "Sign Up" form. As you type, a red message appears saying "Email is invalid" until you fix it.',
    codeExample: '<input value={email} onChange={(e) => setEmail(e.target.value)} />\n{error && <p>{error}</p>}',
    lineByLine: 'Connects the input to React state. Updates state on every keystroke. Conditionally shows an error message.',
    commonMistakes: ['Not providing clear error messages to the user.', 'Only validating on the client side (you must also validate on the server!).'],
    practice: 'Build a login form that requires the password to be at least 8 characters long.',
    challenge: 'What are "Uncontrolled Components" in React?',
    quiz: [
      {
        question: 'What is a "Controlled Component" in React?',
        options: ['A component that uses CSS', 'A component whose value is driven by React state', 'A component that cannot be changed', 'A component that uses external libraries'],
        correctIndex: 1,
        explanation: 'In a controlled component, the form data is handled by a React component state.'
      }
    ],
    recap: 'Great forms are the key to a professional user experience.'
  },
  'web-performance-metrics': {
    id: 'web-performance-metrics',
    title: 'Web Performance Metrics',
    todayYouAreLearning: 'Measuring how fast your website feels to real users.',
    whyItMatters: 'Fast sites have better SEO, higher conversion rates, and happier users.',
    explanation: 'Core Web Vitals are the key metrics Google uses: LCP (Loading speed), FID (Interactivity), and CLS (Visual stability). Understanding these helps you focus your optimization efforts.',
    analogy: 'Performance metrics are like a health check-up for your website. They tell you if your "heart" (loading) is strong and your "reflexes" (interactivity) are fast.',
    visualExplanation: 'Think of a page where the text jumps around as images load. That is a bad "CLS" (Cumulative Layout Shift) score.',
    codeExample: '// Use Lighthouse in Chrome DevTools to measure these!',
    lineByLine: 'Lighthouse is a built-in tool that gives you a performance score from 0 to 100.',
    commonMistakes: ['Only testing on a fast office computer instead of a slow mobile device.', 'Ignoring "Layout Shift" which frustrates users.'],
    practice: 'Run a Lighthouse report on your favorite website and look at the scores.',
    challenge: 'What is "First Contentful Paint" (FCP)?',
    quiz: [
      {
        question: 'Which metric measures how much elements "jump around" during loading?',
        options: ['LCP', 'FID', 'CLS', 'TTFB'],
        correctIndex: 2,
        explanation: 'CLS (Cumulative Layout Shift) measures visual stability.'
      }
    ],
    recap: 'You can\'t improve what you don\'t measure.'
  },
  'image-optimization-techniques': {
    id: 'image-optimization-techniques',
    title: 'Image Optimization',
    todayYouAreLearning: 'Reducing image file sizes without losing quality.',
    whyItMatters: 'Images are usually the largest part of a website. Optimizing them is the fastest way to speed up your site.',
    explanation: 'Techniques include: 1. Using modern formats (WebP). 2. Resizing images to the actual size they appear. 3. Lazy loading images that are "below the fold".',
    analogy: 'Image optimization is like vacuum-sealing your clothes for a trip. They take up much less space, but they are still the same clothes when you unpack them.',
    visualExplanation: 'Imagine a 5MB high-res photo being used as a small 200px profile icon. That is a huge waste of data!',
    codeExample: '<img src="hero.webp" loading="lazy" alt="Hero Image">',
    lineByLine: 'Uses the efficient WebP format. Tells the browser to wait to load this image until it is needed.',
    commonMistakes: ['Using PNGs for photographs (JPEGs or WebP are much smaller).', 'Forgetting the "alt" attribute for accessibility.'],
    practice: 'Convert a large JPEG image to WebP and compare the file sizes.',
    challenge: 'What is a "Responsive Image" using the srcset attribute?',
    quiz: [
      {
        question: 'Which image format is generally the most efficient for the web?',
        options: ['PNG', 'BMP', 'WebP', 'TIFF'],
        correctIndex: 2,
        explanation: 'WebP provides superior lossless and lossy compression for images on the web.'
      }
    ],
    recap: 'Small images lead to big performance gains.'
  },
  'code-splitting-lazy-loading': {
    id: 'code-splitting-lazy-loading',
    title: 'Code Splitting & Lazy Loading',
    todayYouAreLearning: 'Loading only the code the user needs right now.',
    whyItMatters: 'Why load the "Admin Dashboard" code for a regular user? Code splitting keeps your initial bundle small.',
    explanation: 'Code splitting breaks your app into smaller "chunks". Lazy loading (using `React.lazy`) loads those chunks only when the user navigates to that part of the app.',
    analogy: 'It is like a buffet. You don\'t put every dish on your plate at once. You only take what you are ready to eat right now.',
    visualExplanation: 'Think of a "Contact" page. The code for the contact form only downloads when the user clicks the "Contact" link.',
    codeExample: 'const OtherComponent = React.lazy(() => import("./OtherComponent"));',
    lineByLine: 'Tells React to load this component dynamically when it is first rendered.',
    commonMistakes: ['Lazy loading components that are visible immediately (this can cause a flicker).', 'Not providing a "Suspense" fallback (like a loading spinner).'],
    practice: 'Implement React.lazy for one of the routes in your app.',
    challenge: 'What is "Tree Shaking" in modern build tools?',
    quiz: [
      {
        question: 'Which React feature is used alongside React.lazy?',
        options: ['Fragment', 'Suspense', 'StrictMode', 'Profiler'],
        correctIndex: 1,
        explanation: 'Suspense allows you to show a fallback UI while the lazy-loaded component is being fetched.'
      }
    ],
    recap: 'Load less, load faster.'
  },
  'deployment-basics-vercel': {
    id: 'deployment-basics-vercel',
    title: 'Deployment with Vercel',
    todayYouAreLearning: 'Taking your app from your computer to the live internet.',
    whyItMatters: 'A project isn\'t finished until it is live for the world to see.',
    explanation: 'Vercel is a platform that makes deploying frontend apps incredibly easy. You connect your GitHub repo, and it automatically deploys every time you push code.',
    analogy: 'Deployment is like publishing a book. Your code is the manuscript; Vercel is the printing press and the bookstore.',
    visualExplanation: 'Imagine pushing code to GitHub and seeing your live website update automatically 30 seconds later.',
    codeExample: '// No code needed! Just connect your GitHub to Vercel.com',
    lineByLine: 'Vercel handles the build and hosting for you.',
    commonMistakes: ['Forgetting to set environment variables in the Vercel dashboard.', 'Not checking the build logs when a deployment fails.'],
    practice: 'Deploy your profile page or landing page project to Vercel.',
    challenge: 'What is a "Custom Domain" and how do you add one?',
    quiz: [
      {
        question: 'What happens when you push code to a GitHub repo connected to Vercel?',
        options: ['Nothing', 'The repo is deleted', 'Vercel automatically redeploys the app', 'You get an email'],
        correctIndex: 2,
        explanation: 'Vercel uses "Continuous Deployment" to update your site whenever the source code changes.'
      }
    ],
    recap: 'Deployment is the final step in the development lifecycle.'
  },
  'continuous-integration-cd': {
    id: 'continuous-integration-cd',
    title: 'CI/CD for Frontend',
    todayYouAreLearning: 'Automating your testing and deployment process.',
    whyItMatters: 'CI/CD prevents bugs from reaching production and makes releasing new features faster and safer.',
    explanation: 'CI (Continuous Integration) runs tests automatically when you open a PR. CD (Continuous Deployment) pushes the code to production once it is merged.',
    analogy: 'CI/CD is like an automated car wash. You drive in (push code), and it automatically soaps, scrubs, and dries (tests and deploys) without you doing anything.',
    visualExplanation: 'Think of a "Green Checkmark" on your GitHub PR. That means the CI tests passed and it is safe to merge.',
    codeExample: '# .github/workflows/main.yml\non: [push]\njobs:\n  test:\n    run: npm test',
    lineByLine: 'Defines when the automation runs. The task to perform. The command to run your tests.',
    commonMistakes: ['Having a slow CI process that frustrates developers.', 'Not having enough test coverage to catch real bugs.'],
    practice: 'Look at the "Actions" tab in one of your GitHub repositories.',
    challenge: 'What is the difference between "Continuous Delivery" and "Continuous Deployment"?',
    quiz: [
      {
        question: 'What does "CI" stand for?',
        options: ['Code Integration', 'Continuous Integration', 'Constant Improvement', 'Complete Installation'],
        correctIndex: 1,
        explanation: 'Continuous Integration is the practice of merging all developer working copies to a shared mainline several times a day.'
      }
    ],
    recap: 'Automation is the secret to scaling high-quality software.'
  },
  'building-a-portfolio': {
    id: 'building-a-portfolio',
    title: 'Building a Portfolio',
    todayYouAreLearning: 'How to showcase your skills and projects to potential employers.',
    whyItMatters: 'Your portfolio is your real-world resume. It proves you can actually build things.',
    explanation: 'A great portfolio should: 1. Show your best 3-5 projects. 2. Explain the "Why" and "How" behind each project. 3. Be easy to navigate and mobile-friendly.',
    analogy: 'A portfolio is like a chef\'s tasting menu. You don\'t show every dish you\'ve ever made; you show the ones that prove your mastery.',
    visualExplanation: 'Think of a clean, minimal site with large screenshots of your apps and links to the live versions and the code.',
    codeExample: '// Focus on: Project Title, Tech Stack, Problem Solved, and Links.',
    lineByLine: 'These are the key pieces of information every recruiter looks for.',
    commonMistakes: ['Including unfinished or broken projects.', 'Not including a link to the source code on GitHub.'],
    practice: 'Draft a list of the 3 projects you want to feature in your portfolio.',
    challenge: 'Why is a "Case Study" better than just a screenshot?',
    quiz: [
      {
        question: 'How many projects should you typically feature in a portfolio?',
        options: ['1', '3-5', 'All of them', '20+'],
        correctIndex: 1,
        explanation: 'Quality over quantity. 3-5 high-quality projects are better than dozens of small ones.'
      }
    ],
    recap: 'Your portfolio is your most important project.'
  },
  'job-search-strategies': {
    id: 'job-search-strategies',
    title: 'Job Search Strategies',
    todayYouAreLearning: 'How to find and apply for the right frontend roles.',
    whyItMatters: 'The best jobs aren\'t always on the big job boards. You need a strategy to stand out.',
    explanation: 'Effective strategies include: 1. Networking on LinkedIn and Twitter. 2. Contributing to Open Source. 3. Reaching out directly to companies you admire.',
    analogy: 'Job searching is like fishing. You can wait for a fish to bite (apply to ads), or you can go where the fish are (networking).',
    visualExplanation: 'Imagine your LinkedIn profile as a billboard. It should clearly say who you are and what value you bring.',
    codeExample: '// Update your LinkedIn: "Frontend Developer | React | TypeScript"',
    lineByLine: 'Using keywords helps recruiters find you in searches.',
    commonMistakes: ['Applying to 100 jobs with the same generic resume.', 'Ignoring the "hidden job market" (referrals and networking).'],
    practice: 'Optimize your LinkedIn profile with a professional photo and a clear headline.',
    challenge: 'What is an "Informational Interview"?',
    quiz: [
      {
        question: 'What is the most effective way to get a job in tech?',
        options: ['Applying to every job on Indeed', 'Networking and referrals', 'Waiting for recruiters to call', 'Printing your resume'],
        correctIndex: 1,
        explanation: 'Networking often leads to opportunities that aren\'t even posted publicly.'
      }
    ],
    recap: 'Finding a job is a skill in itself. Practice it like you practice coding.'
  },
  'freelancing-fundamentals': {
    id: 'freelancing-fundamentals',
    title: 'Freelancing Fundamentals',
    todayYouAreLearning: 'How to find clients and manage projects as an independent developer.',
    whyItMatters: 'Freelancing gives you freedom and the ability to earn money while you continue to learn.',
    explanation: 'Key steps: 1. Find your niche (e.g., Shopify sites for small businesses). 2. Learn how to price your work (value-based vs hourly). 3. Use contracts to protect yourself.',
    analogy: 'Freelancing is like running your own small shop. You are the manager, the salesperson, and the worker all at once.',
    visualExplanation: 'Think of a simple "Proposal" document that outlines exactly what you will build and how much it will cost.',
    codeExample: '// Tools to learn: Upwork, Fiverr, Trello, and Invoice software.',
    lineByLine: 'These tools help you manage the "business" side of freelancing.',
    commonMistakes: ['Starting work without a signed contract.', 'Underpricing your services because you are "new".'],
    practice: 'Research 3 potential niches for a frontend freelancer.',
    challenge: 'What is a "Retainer" in freelancing?',
    quiz: [
      {
        question: 'What is the most important thing to have before starting a freelance project?',
        options: ['A fancy office', 'A signed contract', 'A new laptop', 'A business card'],
        correctIndex: 1,
        explanation: 'A contract protects both you and the client and ensures everyone knows the expectations.'
      }
    ],
    recap: 'Freelancing is a business. Treat it like one.'
  },
  'interview-prep-frontend': {
    id: 'interview-prep-frontend',
    title: 'Frontend Interview Prep',
    todayYouAreLearning: 'Mastering technical and behavioral interviews.',
    whyItMatters: 'Even great developers need to practice for interviews. It is a specific skill set.',
    explanation: 'Prep for: 1. Technical questions (JS closures, CSS specificity, React hooks). 2. Coding challenges (Whiteboarding). 3. Behavioral questions ("Tell me about a time you failed").',
    analogy: 'An interview is like a performance. You\'ve practiced the music (coding), but you also need to practice how you present it to the audience (the interviewer).',
    visualExplanation: 'Imagine a "Mock Interview" where a friend asks you hard questions and you practice explaining your thought process out loud.',
    codeExample: '// Practice explaining: "How does the Virtual DOM work?"',
    lineByLine: 'Being able to explain concepts clearly is just as important as writing the code.',
    commonMistakes: ['Not asking questions back to the interviewer.', 'Pretending to know an answer when you don\'t (it is better to explain how you would find it).'],
    practice: 'Record yourself explaining a technical concept (like Flexbox) in 2 minutes.',
    challenge: 'What is the "STAR" method for answering behavioral questions?',
    quiz: [
      {
        question: 'What should you do if you don\'t know the answer to a technical question?',
        options: ['Guess randomly', 'Say "I don\'t know" and stop', 'Explain your thought process and how you would find the answer', 'Change the subject'],
        correctIndex: 2,
        explanation: 'Interviewers want to see how you think and solve problems, not just what you have memorized.'
      }
    ],
    recap: 'Preparation is the antidote to interview anxiety.'
  },
};

