import { LessonContent } from '../types';

export const LESSON_CONTENT: Record<string, LessonContent> = {
  'html-intro-1': {
    id: 'html-intro-1',
    title: 'What is HTML?',
    todayYouAreLearning: 'The fundamental concept of HTML and its role in web development.',
    whyItMatters: 'HTML is the foundation of every single website on the internet. You cannot build for the web without it.',
    explanation: 'HTML stands for HyperText Markup Language. It is not a programming language like Python or JavaScript; instead, it is a "markup" language. This means it uses special "tags" to label parts of a document, telling the browser: "This is a heading," "This is a paragraph," or "This is an image."',
    analogy: 'Think of HTML as the skeleton of a building. It provides the structure and defines where the rooms (content) go, but it doesn\'t include the paint (CSS) or the electricity (JavaScript).',
    codeExample: '<h1>Hello, World!</h1>\n<p>This is my first web page.</p>',
    lineByLine: 'The <h1> tag defines a large heading. The <p> tag defines a paragraph of text. Notice how each tag has an opening part like <h1> and a closing part with a slash like </h1>.',
    commonMistakes: [
      'Forgetting the closing tag (e.g., writing <p> without </p>).',
      'Thinking HTML is used for styling (that\'s what CSS is for).',
      'Misspelling tag names.'
    ],
    practice: 'Try to write a heading and a paragraph about your favorite hobby.',
    challenge: 'Can you find a tag that makes text smaller than <h1>? (Hint: try <h2> or <h3>)',
    reflectionQuestion: 'How would the web look if HTML didn\'t exist?',
    quiz: [
      {
        question: 'What does HTML stand for?',
        options: [
          'HyperText Markup Language',
          'HighText Machine Language',
          'HyperTool Multi Language',
          'Hidden Text Markup Language'
        ],
        correctIndex: 0,
        explanation: 'HTML stands for HyperText Markup Language, the standard language for creating web pages.'
      },
      {
        question: 'Is HTML a programming language?',
        options: ['Yes', 'No'],
        correctIndex: 1,
        explanation: 'HTML is a markup language, not a programming language, because it describes structure rather than logic.'
      },
      {
        question: 'What do we use to "label" content in HTML?',
        options: ['Stickers', 'Tags', 'Brackets', 'Codes'],
        correctIndex: 1,
        explanation: 'We use tags (like <p> and <h1>) to define the meaning of content.'
      }
    ],
    recap: 'HTML is the structural foundation of the web, using tags to define content.'
  },
  'html-intro-2': {
    id: 'html-intro-2',
    title: 'How HTML Works',
    todayYouAreLearning: 'How the browser reads your HTML code and turns it into a visual page.',
    whyItMatters: 'Understanding the "rendering" process helps you debug errors and structure your code better.',
    explanation: 'When you open an HTML file, the browser reads it from top to bottom. It looks for tags and builds an internal map called the DOM (Document Object Model). It then uses this map to draw the elements on your screen. If you make a mistake in your tags, the browser might get confused and display things incorrectly.',
    analogy: 'Imagine a browser is like a professional builder. Your HTML file is the blueprint. The builder reads the blueprint and places the bricks (headings), windows (images), and doors (links) exactly where you told them to.',
    codeExample: '<!-- This is a comment, the browser ignores it! -->\n<p>The browser will show this text.</p>',
    lineByLine: 'The first line is a comment. Comments start with <!-- and end with -->. They are for humans to read, not browsers. The second line is a standard paragraph.',
    commonMistakes: [
      'Writing code that the browser can\'t "see" (like putting it inside a comment by mistake).',
      'Expecting the browser to fix your broken tags automatically.',
      'Not saving your file with the .html extension.'
    ],
    practice: 'Create a comment in your code that says "This is my first module".',
    challenge: 'What happens if you put a tag inside another tag? (e.g., <p>Hello <b>World</b></p>)',
    reflectionQuestion: 'Why do you think browsers are designed to ignore comments?',
    quiz: [
      {
        question: 'How does a browser read an HTML file?',
        options: [
          'From bottom to top',
          'From top to bottom',
          'Randomly',
          'It only reads the middle'
        ],
        correctIndex: 1,
        explanation: 'Browsers parse HTML sequentially from the first line to the last.'
      },
      {
        question: 'What is the internal map the browser creates called?',
        options: ['The MAP', 'The DOM', 'The WEB', 'The TAG'],
        correctIndex: 1,
        explanation: 'DOM stands for Document Object Model, which is the browser\'s representation of the page structure.'
      },
      {
        question: 'What is the correct way to write a comment in HTML?',
        // Corrected the options to be valid strings
        options: ['// comment', '/* comment */', '<!-- comment -->', '# comment'],
        correctIndex: 2,
        explanation: 'HTML comments use the <!-- --> syntax.'
      }
    ],
    recap: 'Browsers parse HTML blueprints from top to bottom to render the visual page.'
  },
  'html-intro-3': {
    id: 'html-intro-3',
    title: 'The History of HTML',
    todayYouAreLearning: 'Where HTML came from and how it evolved into the powerful tool it is today.',
    whyItMatters: 'Knowing the history helps you understand why certain tags exist and why we use HTML5 today.',
    explanation: 'HTML was created by Tim Berners-Lee in 1991. At first, it was very simple, used mostly for sharing scientific papers. Over the years, it went through many versions (HTML 2.0, 3.2, 4.01). Today, we use HTML5, which added support for video, audio, and better structure.',
    analogy: 'Think of HTML versions like phone models. HTML 1.0 was like an old rotary phone—it could only do one thing. HTML5 is like a modern smartphone—it can play videos, show maps, and do almost anything.',
    codeExample: '<!-- Old way (HTML 4) -->\n<center>Old Tag</center>\n\n<!-- Modern way (HTML5) -->\n<p style="text-align: center;">Modern Way</p>',
    lineByLine: 'The <center> tag is "deprecated," meaning it\'s old and shouldn\'t be used anymore. In HTML5, we use CSS for centering.',
    commonMistakes: [
      'Using old, outdated tags like <font> or <center>.',
      'Thinking you need to learn all the old versions (just focus on HTML5!).',
      'Not realizing that the web is constantly changing.'
    ],
    practice: 'Search for "list of deprecated HTML tags" to see what you should avoid.',
    challenge: 'When was HTML5 officially released?',
    reflectionQuestion: 'How has the internet changed since 1991?',
    quiz: [
      {
        question: 'Who created HTML?',
        options: ['Bill Gates', 'Steve Jobs', 'Tim Berners-Lee', 'Mark Zuckerberg'],
        correctIndex: 2,
        explanation: 'Tim Berners-Lee invented HTML while working at CERN.'
      },
      {
        question: 'What is the current standard version of HTML?',
        options: ['HTML 4', 'HTML 6', 'HTML5', 'HTML X'],
        correctIndex: 2,
        explanation: 'HTML5 is the current industry standard.'
      },
      {
        question: 'What does "deprecated" mean in web development?',
        options: [
          'The tag is new and cool',
          'The tag is old and should no longer be used',
          'The tag is broken',
          'The tag is for experts only'
        ],
        correctIndex: 1,
        explanation: 'Deprecated tags are outdated and replaced by better methods (usually CSS).'
      }
    ],
    recap: 'HTML has evolved from a simple document language to the rich HTML5 standard we use today.'
  },
  'html-intro-4': {
    id: 'html-intro-4',
    title: 'Tools of the Trade',
    todayYouAreLearning: 'The software you need to write and view HTML code.',
    whyItMatters: 'Using the right tools makes coding faster, easier, and more fun.',
    explanation: 'To build websites, you only need two things: a Code Editor (to write the code) and a Browser (to see the result). Popular editors include VS Code, Sublime Text, and Atom. Popular browsers include Chrome, Firefox, and Safari. Most developers also use "Developer Tools" built into the browser to inspect code.',
    analogy: 'A code editor is like a high-tech notebook for writers. It helps you with spelling (syntax highlighting) and organizing your chapters (files). The browser is like the printed book—it\'s the final version that the reader sees.',
    codeExample: '<!-- No code for this lesson, just a tip! -->\n<!-- Download VS Code at code.visualstudio.com -->',
    lineByLine: 'This is just a helpful tip inside a comment!',
    commonMistakes: [
      'Using a word processor like Microsoft Word to write code (it adds hidden formatting that breaks HTML).',
      'Not using "Syntax Highlighting" (colors that help you read code).',
      'Forgetting to refresh the browser after saving your code changes.'
    ],
    practice: 'Download and install VS Code if you haven\'t already.',
    challenge: 'Open any website, right-click, and select "Inspect". Can you see the HTML?',
    reflectionQuestion: 'Why can\'t we use Microsoft Word for coding?',
    quiz: [
      {
        question: 'Which of these is a popular code editor?',
        options: ['Microsoft Word', 'VS Code', 'Photoshop', 'Excel'],
        correctIndex: 1,
        explanation: 'VS Code is the most popular code editor for web developers today.'
      },
      {
        question: 'What do you use to VIEW your HTML page?',
        options: ['A Code Editor', 'A Web Browser', 'A Calculator', 'An Email App'],
        correctIndex: 1,
        explanation: 'Browsers like Chrome or Firefox are used to render and view HTML files.'
      },
      {
        question: 'What is "Syntax Highlighting"?',
        options: [
          'A way to make the text bigger',
          'Colors used in the editor to make code easier to read',
          'A type of light for your desk',
          'A way to hide your code'
        ],
        correctIndex: 1,
        explanation: 'Syntax highlighting uses colors to distinguish between different parts of the code (like tags vs text).'
      }
    ],
    recap: 'A good code editor and a modern browser are the essential tools for every web developer.'
  },
  'html-intro-5': {
    id: 'html-intro-5',
    title: 'Your First HTML File',
    todayYouAreLearning: 'How to create, save, and open your very first web page.',
    whyItMatters: 'This is the moment you become a web developer! Everything starts with this first file.',
    explanation: 'To create a web page, you create a new file in your editor and save it with the extension `.html`. The most common name for the main page of a site is `index.html`. Once saved, you can double-click the file to open it in your browser.',
    analogy: 'Creating an `index.html` file is like naming the first page of your diary. It tells the world (and the browser) exactly where your story begins.',
    codeExample: '<h1>My First Website</h1>\n<p>I am learning HTML!</p>',
    lineByLine: 'This simple code creates a big title and a line of text. Save this as index.html and open it!',
    commonMistakes: [
      'Saving the file as index.txt instead of index.html.',
      'Forgetting where you saved the file on your computer.',
      'Not putting any content in the file and wondering why the page is blank.'
    ],
    practice: 'Create a file named index.html, add a heading, and open it in your browser.',
    challenge: 'Change the text in your file, save it, and refresh the browser. What happens?',
    reflectionQuestion: 'How did it feel to see your own code on a browser screen?',
    quiz: [
      {
        question: 'What is the standard file extension for HTML files?',
        options: ['.txt', '.web', '.html', '.code'],
        correctIndex: 2,
        explanation: 'Files must end in .html for the browser to recognize them as web pages.'
      },
      {
        question: 'What is the standard name for the main page of a website?',
        options: ['main.html', 'home.html', 'index.html', 'start.html'],
        correctIndex: 2,
        explanation: 'index.html is the default filename that web servers look for.'
      },
      {
        question: 'What do you need to do after changing your code to see the updates in the browser?',
        options: ['Buy a new computer', 'Restart the internet', 'Save the file and refresh the browser', 'Nothing, it happens automatically'],
        correctIndex: 2,
        explanation: 'You must save your changes in the editor and then refresh the page in the browser.'
      }
    ],
    recap: 'Save your work as index.html, open it in a browser, and refresh to see changes.'
  },
  'html-struct-1': {
    id: 'html-struct-1',
    title: 'The Boilerplate',
    todayYouAreLearning: 'The standard "skeleton" code that every HTML file must have.',
    whyItMatters: 'Without this boilerplate, your website might not work correctly on all devices or search engines.',
    explanation: 'Every HTML file needs a few standard tags to be "valid." This includes the doctype, the html tag, the head (for info), and the body (for content). We call this the "boilerplate" because it\'s the same for every project.',
    analogy: 'The boilerplate is like the chassis of a car. Every car needs a frame, wheels, and an engine before you can decide if it\'s a sports car or a truck.',
    codeExample: '<!DOCTYPE html>\n<html>\n<head>\n  <title>Page Title</title>\n</head>\n<body>\n  <!-- Content goes here -->\n</body>\n</html>',
    lineByLine: 'The DOCTYPE tells the browser this is HTML5. <html> wraps everything. <head> is for hidden info. <body> is for visible content.',
    commonMistakes: [
      'Putting visible text outside of the <body> tags.',
      'Forgetting the closing </html> tag at the very end.',
      'Mixing up the <head> and the <body>.'
    ],
    practice: 'Type out the full boilerplate from memory.',
    challenge: 'In VS Code, type "!" and press Tab. What happens? (This is a shortcut!)',
    reflectionQuestion: 'Why do we need a standard structure for every page?',
    quiz: [
      {
        question: 'Which tag wraps the entire HTML document?',
        options: ['<body>', '<head>', '<html>', '<doctype>'],
        correctIndex: 2,
        explanation: 'The <html> tag is the "root" element that contains everything else.'
      },
      {
        question: 'Where do you put the text that you want users to see?',
        options: ['In the <head>', 'In the <body>', 'In the <title>', 'Outside the <html>'],
        correctIndex: 1,
        explanation: 'The <body> tag is the container for all visible content.'
      }
    ],
    recap: 'Every HTML file starts with a standard boilerplate structure.'
  },
  'html-struct-2': {
    id: 'html-struct-2',
    title: 'The <!DOCTYPE> Declaration',
    todayYouAreLearning: 'The very first line of every HTML file and why it is so important.',
    whyItMatters: 'It tells the browser exactly which version of HTML you are using so it doesn\'t get confused.',
    explanation: 'The `<!DOCTYPE html>` declaration is not actually an HTML tag; it\'s an instruction to the web browser about what version of HTML the page is written in. In the past, this line was very long and complex, but in HTML5, it is short and simple.',
    analogy: 'The DOCTYPE is like the "Table of Contents" or the "Language" setting on a DVD. It tells the player (the browser) exactly how to read the disc (the file).',
    codeExample: '<!DOCTYPE html>\n<!-- This must be the very first line! -->',
    lineByLine: 'This simple line tells the browser: "Hey, I\'m using modern HTML5!"',
    commonMistakes: [
      'Putting a space or a comment before the DOCTYPE.',
      'Forgetting the "!" at the beginning.',
      'Thinking it\'s a regular tag that needs a closing tag (it doesn\'t!).'
    ],
    practice: 'Start a new file and make sure the DOCTYPE is the first thing you type.',
    challenge: 'What happens if you leave it out? (Search for "Quirks Mode").',
    reflectionQuestion: 'Why do you think HTML5 made the DOCTYPE so much shorter?',
    quiz: [
      {
        question: 'Where should the <!DOCTYPE html> declaration be placed?',
        options: [
          'At the very end of the file',
          'Inside the <head> tag',
          'As the very first line of the file',
          'Inside the <body> tag'
        ],
        correctIndex: 2,
        explanation: 'The DOCTYPE must be the first thing in your HTML document.'
      },
      {
        question: 'Does the <!DOCTYPE html> need a closing tag?',
        options: ['Yes', 'No'],
        correctIndex: 1,
        explanation: 'It is a declaration, not a tag, so it does not have a closing counterpart.'
      }
    ],
    recap: 'The DOCTYPE declaration tells the browser to use modern HTML5 standards.'
  },
  'html-struct-3': {
    id: 'html-struct-3',
    title: 'The <html> Tag',
    todayYouAreLearning: 'The "root" element that contains every other part of your web page.',
    whyItMatters: 'It defines the boundaries of your document and allows you to set the language of your page.',
    explanation: 'The `<html>` tag follows the DOCTYPE. It is the container for all other HTML elements (except for the DOCTYPE). We often add a `lang` attribute to it (like `<html lang="en">`) to tell search engines and screen readers what language the page is in.',
    analogy: 'The `<html>` tag is like the physical covers of a book. Everything—the title, the chapters, the pictures—is held together inside those covers.',
    codeExample: '<html lang="en">\n  <!-- Everything else goes here -->\n</html>',
    lineByLine: 'The "lang" attribute is set to "en" for English. This helps with accessibility and SEO.',
    commonMistakes: [
      'Forgetting the closing </html> tag.',
      'Putting the DOCTYPE inside the <html> tag.',
      'Not specifying the language (it\'s a best practice!).'
    ],
    practice: 'Add the lang="en" attribute to your html tag.',
    challenge: 'What is the language code for Spanish? Or French?',
    reflectionQuestion: 'How does knowing the language help a screen reader?',
    quiz: [
      {
        question: 'What is the "root" element of an HTML page?',
        options: ['<body>', '<head>', '<html>', '<main>'],
        correctIndex: 2,
        explanation: 'The <html> tag is the root element because it contains all other elements.'
      },
      {
        question: 'What attribute is used to specify the language of the page?',
        options: ['language', 'lang', 'type', 'speech'],
        correctIndex: 1,
        explanation: 'The "lang" attribute (e.g., lang="en") is used to define the language.'
      }
    ],
    recap: 'The <html> tag is the root container for your entire web document.'
  },
  'html-struct-4': {
    id: 'html-struct-4',
    title: 'The <head> Section',
    todayYouAreLearning: 'The "brain" of your page where you store metadata, titles, and links to styles.',
    whyItMatters: 'The head contains information that is vital for the browser and search engines, even if users can\'t see it.',
    explanation: 'The `<head>` element is a container for metadata (data about data). It is placed between the `<html>` tag and the `<body>` tag. Common things inside the head include the `<title>`, `<meta>` tags (for character sets and descriptions), and links to CSS files.',
    analogy: 'The `<head>` is like the "Backstage" of a theater. The audience (users) doesn\'t see the stagehands or the lighting controls, but without them, the show (the website) couldn\'t happen.',
    codeExample: '<head>\n  <meta charset="UTF-8">\n  <title>My Awesome Site</title>\n</head>',
    lineByLine: 'The meta charset="UTF-8" ensures all characters (like emojis!) show up right. The title is what shows up on the browser tab.',
    commonMistakes: [
      'Putting visible content like <h1> or <p> inside the <head>.',
      'Forgetting the <title> tag (it\'s required for a valid page!).',
      'Confusing the <head> tag with the <header> tag (they are different!).'
    ],
    practice: 'Change the <title> of your page and see how it updates in the browser tab.',
    challenge: 'Add a <meta> tag for a description of your site.',
    reflectionQuestion: 'Why is the title important for someone using many browser tabs?',
    quiz: [
      {
        question: 'Is the content inside the <head> tag visible on the main web page?',
        options: ['Yes', 'No'],
        correctIndex: 1,
        explanation: 'The <head> contains metadata and settings, not visible content.'
      },
      {
        question: 'Which tag inside the <head> defines the text shown on the browser tab?',
        options: ['<meta>', '<tab>', '<title>', '<link>'],
        correctIndex: 2,
        explanation: 'The <title> tag sets the name of the page in the browser\'s tab or window.'
      }
    ],
    recap: 'The <head> stores metadata and settings that help the browser understand your page.'
  },
  'html-struct-5': {
    id: 'html-struct-5',
    title: 'The <body> Section',
    todayYouAreLearning: 'The container for all the visible content that users interact with.',
    whyItMatters: 'This is where the "real" website lives. If it\'s not in the body, the user won\'t see it.',
    explanation: 'The `<body>` tag contains all the visible parts of an HTML document, such as headings, paragraphs, images, hyperlinks, tables, lists, etc. There can only be one `<body>` element in an HTML document.',
    analogy: 'The `<body>` is the "Stage" of the theater. Everything the audience sees—the actors, the props, the scenery—happens right here.',
    codeExample: '<body>\n  <h1>Welcome!</h1>\n  <p>Enjoy your stay.</p>\n</body>',
    lineByLine: 'Everything between <body> and </body> will be drawn on the screen by the browser.',
    commonMistakes: [
      'Having more than one <body> tag.',
      'Putting the <body> inside the <head>.',
      'Writing content outside of the <body> tags.'
    ],
    practice: 'Add a few different tags (h1, p, etc.) inside your body and see them appear.',
    challenge: 'What happens if you put a <title> tag inside the <body>?',
    reflectionQuestion: 'Why can we only have one body tag?',
    quiz: [
      {
        question: 'Which tag contains all the visible elements of a web page?',
        options: ['<html>', '<head>', '<body>', '<main>'],
        correctIndex: 2,
        explanation: 'The <body> tag is the container for all visible content.'
      },
      {
        question: 'How many <body> tags can a single HTML document have?',
        options: ['As many as you want', 'Only one', 'Two (one for mobile, one for desktop)', 'Zero'],
        correctIndex: 1,
        explanation: 'An HTML document must have exactly one <body> tag.'
      }
    ],
    recap: 'The <body> tag is the home for all visible content on your web page.'
  },
  'html-text-1': {
    id: 'html-text-1',
    title: 'Headings (h1-h6)',
    todayYouAreLearning: 'How to use headings to create a clear hierarchy for your content.',
    whyItMatters: 'Headings are the first thing users and search engines look at to understand what your page is about.',
    explanation: 'HTML provides six levels of headings. <h1> is the most important (usually the page title), and <h6> is the least important. You should use them in order—don\'t skip from <h1> to <h3> just because you like the size!',
    analogy: 'Headings are like the headlines in a newspaper. The main story has a huge headline (h1), sub-stories have smaller ones (h2), and minor details have even smaller ones (h3-h6).',
    codeExample: '<h1>The Main Title</h1>\n<h2>A Major Section</h2>\n<h3>A Sub-section</h3>',
    lineByLine: '<h1> is the largest and should only be used once per page. <h2> is for main sections. <h3> is for sub-sections within those <h2> areas.',
    commonMistakes: [
      'Using <h1> multiple times on a single page.',
      'Choosing a heading level based on its visual size instead of its structural importance.',
      'Skipping levels (e.g., going from <h1> directly to <h4>).'
    ],
    practice: 'Create a page structure for a recipe book using h1 for the book title, h2 for chapters, and h3 for recipe names.',
    challenge: 'Try to find a website that uses an <h5> or <h6>. They are rare!',
    reflectionQuestion: 'Why is it important for a screen reader to know the heading level?',
    quiz: [
      {
        question: 'Which heading level is the most important?',
        options: ['h6', 'h1', 'h3', 'header'],
        correctIndex: 1,
        explanation: 'h1 is the primary heading and should represent the main topic of the page.'
      },
      {
        question: 'Is it okay to skip heading levels (e.g., h1 to h4)?',
        options: ['Yes, if it looks better', 'No, it breaks the logical structure'],
        correctIndex: 1,
        explanation: 'Headings should follow a logical, nested order for accessibility and SEO.'
      }
    ],
    recap: 'Use h1-h6 to define the hierarchy of your content, starting with one h1 per page.'
  },
  'html-text-2': {
    id: 'html-text-2',
    title: 'Paragraphs',
    todayYouAreLearning: 'How to group sentences into readable blocks of text.',
    whyItMatters: 'Paragraphs are the most common way to display text. Without them, your page would be a giant, unreadable wall of words.',
    explanation: 'The <p> tag defines a paragraph. Browsers automatically add some space (margin) before and after each paragraph to make them stand out.',
    analogy: 'A paragraph tag is like a container for a single thought. Just like in a book, you start a new paragraph when you move on to a new idea.',
    codeExample: '<p>This is my first paragraph of text.</p>\n<p>This is my second paragraph, separated by a gap.</p>',
    lineByLine: 'Each <p> tag creates a new block of text with space around it.',
    commonMistakes: [
      'Using <br> (line breaks) to create space between paragraphs instead of using separate <p> tags.',
      'Putting other block-level elements (like <ul> or <h1>) inside a <p> tag.',
      'Forgetting the closing </p> tag.'
    ],
    practice: 'Write two paragraphs about your favorite movie.',
    challenge: 'What happens if you put a lot of spaces inside your <p> tag in the code? Does the browser show them?',
    reflectionQuestion: 'Why does the browser ignore extra spaces in your HTML code?',
    quiz: [
      {
        question: 'What tag is used for a paragraph?',
        options: ['<para>', '<p>', '<text>', '<div>'],
        correctIndex: 1,
        explanation: 'The <p> tag is the standard way to define a paragraph.'
      },
      {
        question: 'Does the browser add space between two <p> tags automatically?',
        options: ['Yes', 'No'],
        correctIndex: 0,
        explanation: 'Browsers apply default margins to paragraphs to ensure readability.'
      }
    ],
    recap: 'Use the <p> tag to organize your text into readable blocks.'
  },
  'html-text-3': {
    id: 'html-text-3',
    title: 'Bold and Italic',
    todayYouAreLearning: 'How to emphasize specific words or phrases in your text.',
    whyItMatters: 'Emphasis helps guide the reader\'s eye to the most important parts of your message.',
    explanation: 'We use <strong> for bold text that is important, and <em> for italicized text that needs emphasis. While <b> and <i> also exist, <strong> and <em> are preferred because they have "semantic meaning"—they tell screen readers that the text is actually important, not just visually different.',
    analogy: 'Using <strong> is like raising your voice to show importance. Using <em> is like changing your tone to add stress to a word.',
    codeExample: '<p>This is <strong>very important</strong>!</p>\n<p>I <em>really</em> love coding.</p>',
    lineByLine: '<strong> makes text bold. <em> makes text italic. Both are "inline" tags, meaning they don\'t start a new line.',
    commonMistakes: [
      'Using <b> and <i> for everything (use strong and em for better accessibility).',
      'Overusing bold text, which makes it lose its impact.',
      'Forgetting to close the tags, which makes the rest of the page bold/italic.'
    ],
    practice: 'Write a sentence where you emphasize one word and make another word "important".',
    challenge: 'Can you put an <em> tag inside a <strong> tag? Try it!',
    reflectionQuestion: 'Why is "importance" (strong) different from just "looking bold" (b)?',
    quiz: [
      {
        question: 'Which tag is preferred for bold text with importance?',
        options: ['<b>', '<strong>', '<bold>', '<emp>'],
        correctIndex: 1,
        explanation: '<strong> is the semantic way to indicate important bold text.'
      },
      {
        question: 'Which tag is used for italics/emphasis?',
        options: ['<i>', '<italic>', '<em>', '<cite>'],
        correctIndex: 2,
        explanation: '<em> stands for emphasis and renders as italics.'
      }
    ],
    recap: 'Use <strong> for importance and <em> for emphasis to make your text more meaningful.'
  },
  'html-text-4': {
    id: 'html-text-4',
    title: 'Line Breaks and Rules',
    todayYouAreLearning: 'How to force a new line or draw a dividing line between sections.',
    whyItMatters: 'Sometimes you need to break a line without starting a whole new paragraph (like in a poem or an address).',
    explanation: 'The <br> tag creates a single line break. The <hr> tag creates a horizontal rule (a line) that separates content. Both of these are "void" tags, meaning they don\'t have a closing tag.',
    analogy: '<br> is like pressing "Shift + Enter" in a word processor. <hr> is like drawing a line across the page with a ruler to show that one topic has ended and another is beginning.',
    codeExample: '<p>123 Web Street<br>Code City, 90210</p>\n<hr>\n<p>New Section Starts Here</p>',
    lineByLine: '<br> forces the text after it to the next line. <hr> draws a horizontal line across the container.',
    commonMistakes: [
      'Using <br> to create large gaps between elements (use CSS margins instead).',
      'Trying to close these tags like <br></br> (they are self-closing!).',
      'Using <hr> too often, which can clutter the design.'
    ],
    practice: 'Write your favorite short poem using <br> for each line.',
    challenge: 'Can you find a way to change the color of the <hr> line? (Hint: you\'ll need a tiny bit of CSS).',
    reflectionQuestion: 'When is a line (hr) better than just a new heading?',
    quiz: [
      {
        question: 'Which tag creates a single line break?',
        options: ['<break>', '<lb>', '<br>', '<hr>'],
        correctIndex: 2,
        explanation: '<br> stands for break and moves content to the next line.'
      },
      {
        question: 'Does the <hr> tag need a closing tag?',
        options: ['Yes', 'No'],
        correctIndex: 1,
        explanation: '<hr> is a void element and does not have a closing tag.'
      }
    ],
    recap: 'Use <br> for simple line breaks and <hr> for visual separation between sections.'
  },
  'html-text-5': {
    id: 'html-text-5',
    title: 'Preformatted Text',
    todayYouAreLearning: 'How to display text exactly as you type it, including all spaces and line breaks.',
    whyItMatters: 'Normally, browsers collapse multiple spaces into one. The <pre> tag stops this, which is perfect for showing code or ASCII art.',
    explanation: 'The <pre> tag (short for preformatted) tells the browser: "Don\'t touch my spacing!" It also usually displays text in a "monospace" font (where every letter is the same width).',
    analogy: '<pre> is like a photograph of your text. It captures every space, tab, and enter key exactly as you placed them in your editor.',
    codeExample: '<pre>\n  Line 1\n    Line 2 (indented)\n  Line 3\n</pre>',
    lineByLine: 'The spaces at the start of Line 2 will be preserved and shown in the browser.',
    commonMistakes: [
      'Using <pre> for regular paragraphs (it makes them hard to read because they don\'t wrap).',
      'Forgetting that <pre> text can overflow the screen if the lines are too long.',
      'Not realizing that the font will change to monospace.'
    ],
    practice: 'Try to draw a simple "smiley face" or a "box" using only keyboard characters inside a <pre> tag.',
    challenge: 'What happens if you put an <h1> tag inside a <pre> tag?',
    reflectionQuestion: 'Why is a monospace font (like in <pre>) better for reading code?',
    quiz: [
      {
        question: 'What does the <pre> tag preserve?',
        options: ['Only colors', 'Spaces and line breaks', 'Images', 'Links'],
        correctIndex: 1,
        explanation: '<pre> preserves the exact formatting of the text inside it.'
      },
      {
        question: 'What type of font does <pre> usually use?',
        options: ['Sans-serif', 'Serif', 'Monospace', 'Cursive'],
        correctIndex: 2,
        explanation: 'Monospace fonts are used so that characters and spaces align perfectly.'
      }
    ],
    recap: 'Use <pre> when you need to maintain exact spacing and indentation.'
  },
  'html-links-1': {
    id: 'html-links-1',
    title: 'Creating Hyperlinks',
    todayYouAreLearning: 'How to connect different web pages together using links.',
    whyItMatters: 'Links are the "Hypertext" in HTML. They are what make the World Wide Web a "web" of connected information.',
    explanation: 'The <a> (anchor) tag is used to create links. It requires an `href` attribute, which stands for "hypertext reference"—this is the destination address where the link will take you.',
    analogy: 'A hyperlink is like a magic portal. When you step through it (click it), you are instantly transported to another location (another page).',
    codeExample: '<a href="https://www.google.com">Go to Google</a>',
    lineByLine: 'The <a> tag starts the link. href="..." defines the destination. The text between the tags is what the user clicks on.',
    commonMistakes: [
      'Forgetting the http:// or https:// in external links (the browser will think it\'s a local file).',
      'Leaving the href empty or missing.',
      'Not providing clear text for the link (e.g., just saying "Click Here").'
    ],
    practice: 'Create a link to your favorite news website.',
    challenge: 'Can you make a link that sends an email? (Hint: search for "mailto:").',
    reflectionQuestion: 'How would you find information on the web if links didn\'t exist?',
    quiz: [
      {
        question: 'What does the "a" in the <a> tag stand for?',
        options: ['Address', 'Anchor', 'Arrow', 'Action'],
        correctIndex: 1,
        explanation: 'The <a> tag stands for Anchor, as it "anchors" a link to a specific spot.'
      },
      {
        question: 'Which attribute is required for a link to work?',
        options: ['src', 'link', 'href', 'url'],
        correctIndex: 2,
        explanation: 'href specifies the destination URL of the link.'
      }
    ],
    recap: 'Use <a> with the href attribute to create connections between pages.'
  },
  'html-links-2': {
    id: 'html-links-2',
    title: 'Absolute vs Relative Paths',
    todayYouAreLearning: 'The two different ways to tell a link where to go.',
    whyItMatters: 'Using the right path ensures your links don\'t break when you move your website to a real server.',
    explanation: 'An Absolute Path is a full URL (like https://google.com). A Relative Path points to a file on your own computer or server (like "about.html"). Relative paths are better for internal links because they still work even if your domain name changes.',
    analogy: 'An Absolute Path is like a full mailing address (Country, City, Street, House #). A Relative Path is like giving directions to someone already in your house: "Go to the kitchen."',
    codeExample: '<!-- Absolute -->\n<a href="https://wikipedia.org">Wikipedia</a>\n\n<!-- Relative -->\n<a href="contact.html">Contact Us</a>',
    lineByLine: 'Absolute paths start with http/https. Relative paths usually just start with the filename or a folder name.',
    commonMistakes: [
      'Using absolute paths for your own internal pages (it makes testing harder).',
      'Forgetting that relative paths are "relative" to the current file\'s location.',
      'Using backslashes (\\) instead of forward slashes (/) in paths.'
    ],
    practice: 'Create a relative link to a file named "gallery.html".',
    challenge: 'How do you link to a file that is inside a folder named "images"?',
    reflectionQuestion: 'Why is it easier to maintain a site using relative paths?',
    quiz: [
      {
        question: 'Which path type includes the full "https://" address?',
        options: ['Relative', 'Absolute', 'Internal', 'Local'],
        correctIndex: 1,
        explanation: 'Absolute paths provide the complete URL from the root of the internet.'
      },
      {
        question: 'If your file is in the same folder as "index.html", what path should you use?',
        options: ['https://mysite.com/index.html', 'index.html', '/root/index.html', 'C:/files/index.html'],
        correctIndex: 1,
        explanation: 'A simple relative path (the filename) is best for files in the same directory.'
      }
    ],
    recap: 'Use absolute paths for external sites and relative paths for your own pages.'
  },
  'html-links-3': {
    id: 'html-links-3',
    title: 'Opening Links in New Tabs',
    todayYouAreLearning: 'How to keep your website open while the user visits another one.',
    whyItMatters: 'If you link to another site, you don\'t want the user to "leave" your site forever. Opening it in a new tab solves this.',
    explanation: 'By adding the `target="_blank"` attribute to your link, the browser will open the destination in a new tab or window.',
    analogy: 'It\'s like handing someone a second book to look at without taking away the first book they were reading.',
    codeExample: '<a href="https://google.com" target="_blank">Search (New Tab)</a>',
    lineByLine: 'target="_blank" is the magic instruction that tells the browser to use a new tab.',
    commonMistakes: [
      'Opening every single link in a new tab (this is annoying for users!).',
      'Forgetting the underscore in _blank.',
      'Not using rel="noopener" for security (modern browsers handle this better now, but it\'s still a good habit).'
    ],
    practice: 'Add target="_blank" to a link that goes to a social media site.',
    challenge: 'What happens if you use target="_self"? (Hint: it\'s the default!).',
    reflectionQuestion: 'When is it better NOT to open a link in a new tab?',
    quiz: [
      {
        question: 'What attribute opens a link in a new tab?',
        options: ['new-tab="true"', 'open="window"', 'target="_blank"', 'mode="external"'],
        correctIndex: 2,
        explanation: 'target="_blank" is the standard attribute for opening links in new tabs.'
      },
      {
        question: 'Should you open internal links (to your own pages) in new tabs?',
        options: ['Yes, always', 'No, usually not'],
        correctIndex: 1,
        explanation: 'Internal links should usually stay in the same tab to maintain a smooth navigation flow.'
      }
    ],
    recap: 'Use target="_blank" sparingly, mostly for external websites.'
  },
  'html-links-4': {
    id: 'html-links-4',
    title: 'Adding Images',
    todayYouAreLearning: 'How to display pictures and graphics on your web page.',
    whyItMatters: 'A website without images is just a document. Images make your site engaging, professional, and informative.',
    explanation: 'The <img> tag is used to embed images. It uses the `src` attribute to find the image file. Unlike most tags, <img> is "self-closing"—it doesn\'t need a </img> at the end.',
    analogy: 'An <img> tag is like a picture frame on a wall. The "src" is the actual photo you put inside that frame.',
    codeExample: '<img src="my-dog.jpg" alt="A photo of my golden retriever">',
    lineByLine: 'src="..." is the path to the image. alt="..." is a text description (very important!).',
    commonMistakes: [
      'Using massive image files that take forever to load.',
      'Forgetting the alt attribute (bad for accessibility).',
      'Using the wrong file extension (e.g., .jpg vs .png).'
    ],
    practice: 'Find a small image online, copy its URL, and display it using an <img> tag.',
    challenge: 'Can you change the width of an image using only HTML? (Hint: use the width attribute).',
    reflectionQuestion: 'What happens if the image file is deleted but the code is still there?',
    quiz: [
      {
        question: 'Which attribute tells the browser WHERE the image is?',
        options: ['href', 'link', 'src', 'url'],
        correctIndex: 2,
        explanation: 'src stands for "source" and points to the image file.'
      },
      {
        question: 'Does the <img> tag need a closing </img> tag?',
        options: ['Yes', 'No'],
        correctIndex: 1,
        explanation: '<img> is a self-closing (void) element.'
      }
    ],
    recap: 'Use <img> with the src attribute to add visuals to your site.'
  },
  'html-links-5': {
    id: 'html-links-5',
    title: 'Image Alt Text',
    todayYouAreLearning: 'How to describe your images for people who cannot see them.',
    whyItMatters: 'Alt text is vital for accessibility (screen readers) and SEO (search engines). It also shows up if the image fails to load.',
    explanation: 'The `alt` attribute should contain a short, descriptive summary of what is in the image. If the image is just for decoration (like a background pattern), you can leave it empty: alt="".',
    analogy: 'Alt text is like describing a photo to a friend over the phone. You want to give them the most important details so they can "see" it in their mind.',
    codeExample: '<img src="logo.png" alt="MentorStack Company Logo">',
    lineByLine: 'The alt text should be specific. Instead of "logo", use "MentorStack Company Logo".',
    commonMistakes: [
      'Writing "image of..." or "picture of..." (the browser already knows it\'s an image).',
      'Leaving the alt attribute out entirely.',
      'Writing extremely long descriptions in the alt tag.'
    ],
    practice: 'Write a perfect alt description for a photo of a mountain during sunset.',
    challenge: 'What should the alt text be for a "Submit" button that is an image of a checkmark?',
    reflectionQuestion: 'How does alt text help a search engine like Google?',
    quiz: [
      {
        question: 'Who primarily uses alt text?',
        options: ['Hackers', 'People using screen readers', 'Only developers', 'Nobody'],
        correctIndex: 1,
        explanation: 'Screen readers read alt text aloud to visually impaired users.'
      },
      {
        question: 'If an image is purely decorative, what should the alt text be?',
        options: ['"decoration"', 'Leave it blank (alt="")', 'Describe it anyway', 'Don\'t use an alt attribute'],
        correctIndex: 1,
        explanation: 'An empty alt attribute tells screen readers to skip the image.'
      }
    ],
    recap: 'Always provide descriptive alt text for every meaningful image.'
  },
  'html-lists-1': {
    id: 'html-lists-1',
    title: 'Unordered Lists',
    todayYouAreLearning: 'How to create bulleted lists for grouping related items.',
    whyItMatters: 'Lists are essential for navigation menus, feature lists, and organizing information clearly.',
    explanation: 'An unordered list starts with the `<ul>` tag. Each item in the list is wrapped in an `<li>` (list item) tag. By default, browsers show these as a list with small black circles (bullets).',
    analogy: 'An unordered list is like a grocery list. It doesn\'t matter if you buy the milk or the bread first—the order isn\'t important.',
    codeExample: '<ul>\n  <li>Milk</li>\n  <li>Bread</li>\n  <li>Eggs</li>\n</ul>',
    lineByLine: '<ul> is the container. Each <li> is a single bullet point.',
    commonMistakes: [
      'Putting text directly inside the <ul> tag without using <li>.',
      'Forgetting to close the <ul> tag.',
      'Using <ul> when the order of items actually matters.'
    ],
    practice: 'Create a list of your three favorite hobbies.',
    challenge: 'Can you put a link inside a list item?',
    reflectionQuestion: 'Why is a list easier to read than a long sentence with commas?',
    quiz: [
      {
        question: 'What does <ul> stand for?',
        options: ['Under Line', 'Unordered List', 'User Link', 'Unique List'],
        correctIndex: 1,
        explanation: '<ul> stands for Unordered List, meaning the items have no specific numerical order.'
      },
      {
        question: 'Which tag is used for each item in the list?',
        options: ['<item>', '<list>', '<li>', '<ul>'],
        correctIndex: 2,
        explanation: '<li> stands for List Item.'
      }
    ],
    recap: 'Use <ul> and <li> to create bulleted lists of related items.'
  },
  'html-lists-2': {
    id: 'html-lists-2',
    title: 'Ordered Lists',
    todayYouAreLearning: 'How to create numbered lists for steps or rankings.',
    whyItMatters: 'Ordered lists are perfect for recipes, instructions, or "Top 10" lists where the sequence matters.',
    explanation: 'An ordered list uses the `<ol>` tag. Just like unordered lists, each item uses the `<li>` tag. The browser automatically adds the numbers for you!',
    analogy: 'An ordered list is like a recipe. You must "1. Crack the egg" before you "2. Fry the egg". The order is vital.',
    codeExample: '<ol>\n  <li>Step One</li>\n  <li>Step Two</li>\n</ol>',
    lineByLine: '<ol> starts the numbered list. The browser handles the 1, 2, 3... automatically.',
    commonMistakes: [
      'Manually typing "1." or "2." inside your <li> tags (the browser does this for you!).',
      'Using <ol> for items that don\'t have a specific order.',
      'Forgetting that you can change the numbering style (like A, B, C) with CSS later.'
    ],
    practice: 'Create a list of steps to make a cup of coffee.',
    challenge: 'Can you make an ordered list start at the number 5? (Hint: search for the "start" attribute).',
    reflectionQuestion: 'What happens to the numbers if you delete the second item in an <ol>?',
    quiz: [
      {
        question: 'What does <ol> stand for?',
        options: ['Only List', 'Ordered List', 'Object Link', 'Open List'],
        correctIndex: 1,
        explanation: '<ol> stands for Ordered List.'
      },
      {
        question: 'If you add a new <li> to the middle of an <ol>, what happens to the numbers?',
        options: ['They break', 'They stay the same', 'They re-number automatically', 'They disappear'],
        correctIndex: 2,
        explanation: 'Browsers automatically update the numbering when items are added or removed.'
      }
    ],
    recap: 'Use <ol> and <li> for sequences where the order is important.'
  },
  'html-lists-3': {
    id: 'html-lists-3',
    title: 'Nested Lists',
    todayYouAreLearning: 'How to put a list inside another list to create sub-categories.',
    whyItMatters: 'Nesting allows you to create complex outlines, multi-level menus, and detailed lists.',
    explanation: 'To nest a list, you place a new `<ul>` or `<ol>` *inside* an `<li>` tag of the parent list.',
    analogy: 'Nesting is like a folder inside another folder. You have a "Fruits" folder, and inside it, you have a "Tropical" folder.',
    codeExample: '<ul>\n  <li>Fruits\n    <ul>\n      <li>Apple</li>\n      <li>Banana</li>\n    </ul>\n  </li>\n  <li>Vegetables</li>\n</ul>',
    lineByLine: 'The second <ul> is placed inside the first <li> before that <li> is closed.',
    commonMistakes: [
      'Closing the parent <li> before starting the nested list.',
      'Nesting too many levels deep, which makes the page look messy.',
      'Mixing up <ul> and <ol> in a way that confuses the reader.'
    ],
    practice: 'Create a list of "Continents" and nest a list of "Countries" inside one of them.',
    challenge: 'Can you nest an ordered list inside an unordered list?',
    reflectionQuestion: 'How does indentation help you read nested code?',
    quiz: [
      {
        question: 'Where should a nested list be placed?',
        options: ['Between two <li> tags', 'Inside an <li> tag', 'Outside the <ul> tag', 'In the <head>'],
        correctIndex: 1,
        explanation: 'A nested list must be a child of a list item (<li>).'
      },
      {
        question: 'Can you nest an <ol> inside a <ul>?',
        options: ['Yes', 'No'],
        correctIndex: 0,
        explanation: 'You can mix and match list types as much as you need.'
      }
    ],
    recap: 'Nest lists by placing them inside <li> tags to create hierarchy.'
  },
  'html-lists-4': {
    id: 'html-lists-4',
    title: 'Basic Tables',
    todayYouAreLearning: 'How to display data in a grid of rows and columns.',
    whyItMatters: 'Tables are the best way to show structured data like schedules, price lists, or sports scores.',
    explanation: 'A table is built using three main tags: `<table>` (the container), `<tr>` (table row), and `<td>` (table data/cell).',
    analogy: 'A table is like a spreadsheet or a piece of graph paper. You define the rows first, then fill in the boxes in each row.',
    codeExample: '<table>\n  <tr>\n    <td>Row 1, Cell 1</td>\n    <td>Row 1, Cell 2</td>\n  </tr>\n</table>',
    lineByLine: '<table> starts the grid. <tr> creates a horizontal row. <td> creates a single box in that row.',
    commonMistakes: [
      'Using tables to create the layout of your whole website (this is an old, bad practice—use CSS instead!).',
      'Forgetting to close the <tr> tags.',
      'Having a different number of cells in different rows (this makes the table look broken).'
    ],
    practice: 'Create a simple 2x2 table showing your name and your favorite color.',
    challenge: 'How do you add a border to your table using only HTML? (Hint: use the border attribute).',
    reflectionQuestion: 'Why shouldn\'t we use tables for page layouts anymore?',
    quiz: [
      {
        question: 'Which tag defines a single row in a table?',
        options: ['<td>', '<th>', '<tr>', '<row>'],
        correctIndex: 2,
        explanation: '<tr> stands for Table Row.'
      },
      {
        question: 'Which tag defines a single cell of data?',
        options: ['<td>', '<tr>', '<table>', '<cell>'],
        correctIndex: 0,
        explanation: '<td> stands for Table Data.'
      }
    ],
    recap: 'Use <table>, <tr>, and <td> to build data grids.'
  },
  'html-lists-5': {
    id: 'html-lists-5',
    title: 'Table Headers',
    todayYouAreLearning: 'How to label your table columns so they are easy to understand.',
    whyItMatters: 'Headers make tables much more readable and accessible for screen readers.',
    explanation: 'Instead of using `<td>` for the first row, we use `<th>` (table header). Browsers usually make these bold and centered by default.',
    analogy: 'Table headers are like the bold labels at the top of a column in a calendar (Mon, Tue, Wed).',
    codeExample: '<table>\n  <tr>\n    <th>Name</th>\n    <th>Score</th>\n  </tr>\n  <tr>\n    <td>Alice</td>\n    <td>100</td>\n  </tr>\n</table>',
    lineByLine: '<th> is used in the first row to label the columns.',
    commonMistakes: [
      'Using <td> for headers and then trying to make them bold manually.',
      'Forgetting to put the <th> tags inside a <tr>.',
      'Not using headers at all for complex data.'
    ],
    practice: 'Add headers to the 2x2 table you created in the last lesson.',
    challenge: 'What is the <thead> tag? (Hint: it helps group all your header rows).',
    reflectionQuestion: 'How does a screen reader use <th> to help a blind user?',
    quiz: [
      {
        question: 'What does <th> stand for?',
        options: ['Table Height', 'Table Header', 'Table Help', 'Table Hint'],
        correctIndex: 1,
        explanation: '<th> defines a header cell in a table.'
      },
      {
        question: 'How do browsers usually display <th> text?',
        options: ['Italic and red', 'Small and gray', 'Bold and centered', 'Underlined'],
        correctIndex: 2,
        explanation: 'Most browsers default to bold and centered for header cells.'
      }
    ],
    recap: 'Always use <th> to label your table columns for better clarity.'
  },
  'html-forms-1': {
    id: 'html-forms-1',
    title: 'The <form> Tag',
    todayYouAreLearning: 'How to create a container for all user input on your website.',
    whyItMatters: 'Forms are the primary way users interact with your site—whether they are logging in, searching, or signing up for a newsletter.',
    explanation: 'The `<form>` tag wraps all your input elements. It tells the browser that everything inside is part of one single data submission. It also uses the `action` attribute to define where the data should be sent.',
    analogy: 'A form is like a physical paper application. It holds all the different fields (name, age, signature) together until you hand it in to the office.',
    codeExample: '<form action="/submit-data" method="POST">\n  <!-- Inputs go here -->\n</form>',
    lineByLine: 'action="..." is the URL where the data goes. method="POST" is a secure way to send data.',
    commonMistakes: [
      'Forgetting to wrap your inputs in a <form> tag.',
      'Not specifying an action, which can cause the page to just refresh.',
      'Putting a form inside another form (this is not allowed!).'
    ],
    practice: 'Create a basic form tag with an action attribute pointing to "success.html".',
    challenge: 'What is the difference between the "GET" and "POST" methods?',
    reflectionQuestion: 'What happens to the data if you don\'t have a form tag?',
    quiz: [
      {
        question: 'Which tag is the container for all form elements?',
        options: ['<input>', '<form>', '<submit>', '<data>'],
        correctIndex: 1,
        explanation: 'The <form> tag groups all inputs together for submission.'
      },
      {
        question: 'What does the "action" attribute define?',
        options: ['The color of the button', 'Where to send the form data', 'The name of the user', 'How fast the form loads'],
        correctIndex: 1,
        explanation: 'The action attribute specifies the URL where the form data will be processed.'
      }
    ],
    recap: 'Use the <form> tag to group and submit user input data.'
  },
  'html-forms-2': {
    id: 'html-forms-2',
    title: 'Text Inputs',
    todayYouAreLearning: 'How to create simple boxes where users can type their information.',
    whyItMatters: 'Text inputs are the most basic and common way to collect names, usernames, and other short pieces of text.',
    explanation: 'The `<input>` tag with `type="text"` creates a single-line text box. You can also use the `placeholder` attribute to show a hint to the user about what to type.',
    analogy: 'A text input is like a blank line on a form that says "Name: __________". It\'s a clear space for the user to provide their answer.',
    codeExample: '<input type="text" placeholder="Enter your username">',
    lineByLine: 'type="text" defines the input style. placeholder="..." shows the gray hint text inside the box.',
    commonMistakes: [
      'Forgetting to give your input a "name" attribute (the server needs this to identify the data!).',
      'Using a placeholder as a replacement for a label (placeholders disappear when the user types).',
      'Not closing the input tag (remember, it\'s self-closing!).'
    ],
    practice: 'Create a text input for a "City" field with a placeholder.',
    challenge: 'How can you set a default value that is already typed in the box? (Hint: use the "value" attribute).',
    reflectionQuestion: 'Why is it better to use a placeholder than to leave the box completely empty?',
    quiz: [
      {
        question: 'Which attribute defines the type of input?',
        options: ['kind', 'style', 'type', 'mode'],
        correctIndex: 2,
        explanation: 'The type attribute (e.g., type="text") determines how the input looks and behaves.'
      },
      {
        question: 'What does the "placeholder" attribute do?',
        options: ['It saves the data', 'It shows a hint inside the input', 'It makes the input bold', 'It validates the text'],
        correctIndex: 1,
        explanation: 'Placeholders provide a temporary hint to the user.'
      }
    ],
    recap: 'Use <input type="text"> for single-line text entry.'
  },
  'html-forms-3': {
    id: 'html-forms-3',
    title: 'Labels & IDs',
    todayYouAreLearning: 'How to properly name your inputs so they are accessible and easy to use.',
    whyItMatters: 'Labels are crucial for accessibility. They allow screen readers to tell users what an input is for, and they make it easier to click on the input.',
    explanation: 'The `<label>` tag is connected to an input using the `for` attribute on the label and the `id` attribute on the input. These two values must match exactly.',
    analogy: 'A label is like a name tag for a person. Without it, you might know someone is there, but you don\'t know who they are or what they do.',
    codeExample: '<label for="user-email">Email Address:</label>\n<input type="email" id="user-email">',
    lineByLine: 'The "for" in the label matches the "id" in the input. This "bonds" them together.',
    commonMistakes: [
      'Not matching the "for" and "id" values exactly (even a small typo breaks the connection).',
      'Using the same ID for multiple elements (IDs must be unique on the whole page).',
      'Forgetting to use labels entirely.'
    ],
    practice: 'Create a label and a text input for "First Name" and connect them using an ID.',
    challenge: 'What happens when you click on the label text in your browser? Try it!',
    reflectionQuestion: 'How does clicking a label help someone with a small phone or a shaky hand?',
    quiz: [
      {
        question: 'Which attribute on the <label> connects it to an input?',
        options: ['to', 'for', 'id', 'link'],
        correctIndex: 1,
        explanation: 'The "for" attribute is used to associate a label with an input\'s ID.'
      },
      {
        question: 'Should an "id" be unique on a web page?',
        options: ['Yes', 'No'],
        correctIndex: 0,
        explanation: 'Every ID must be unique to avoid confusing the browser and accessibility tools.'
      }
    ],
    recap: 'Always use <label for="..."> and <input id="..."> to connect your form elements.'
  },
  'html-forms-4': {
    id: 'html-forms-4',
    title: 'Buttons',
    todayYouAreLearning: 'How to create buttons that users can click to submit their forms.',
    whyItMatters: 'Buttons are the "Go" signal. Without a button, a user can fill out a form but they can\'t send the information to you.',
    explanation: 'The `<button>` tag creates a clickable button. Inside a form, the default type is `type="submit"`, which sends the form data to the action URL.',
    analogy: 'A button is like the "Send" button on an email or a "Submit" button on a physical application.',
    codeExample: '<button type="submit">Submit Registration</button>',
    lineByLine: 'type="submit" tells the browser to process the form when clicked. The text between the tags is what appears on the button.',
    commonMistakes: [
      'Using an <a> tag and trying to make it look like a button (use a real <button> for forms!).',
      'Forgetting to include a submit button in your form.',
      'Not giving the button a clear, action-oriented label (like "Send" or "Join Now").'
    ],
    practice: 'Add a submit button to the form you\'ve been building.',
    challenge: 'What other "types" can a button have? (Hint: try type="reset").',
    reflectionQuestion: 'Why is it important for a button to look "clickable"?',
    quiz: [
      {
        question: 'What is the default behavior of a <button> inside a <form>?',
        options: ['It clears the form', 'It submits the form', 'It closes the browser', 'It does nothing'],
        correctIndex: 1,
        explanation: 'By default, buttons in forms act as submit buttons.'
      },
      {
        question: 'Which attribute explicitly defines a button as a submit button?',
        options: ['action="submit"', 'mode="send"', 'type="submit"', 'role="button"'],
        correctIndex: 2,
        explanation: 'type="submit" ensures the button triggers the form submission.'
      }
    ],
    recap: 'Use the <button> tag to allow users to take action on your forms.'
  },
  'html-forms-5': {
    id: 'html-forms-5',
    title: 'Checkboxes & Radio Buttons',
    todayYouAreLearning: 'How to let users pick from a list of options.',
    whyItMatters: 'Sometimes you want users to pick one option (like a gender) or multiple options (like their interests).',
    explanation: 'Use `type="checkbox"` for multiple choices and `type="radio"` for a single choice from a group. For radio buttons to work as a group, they must all have the same `name` attribute.',
    analogy: 'A checkbox is like a "Check all that apply" list. A radio button is like a multiple-choice question where there is only one correct answer.',
    codeExample: '<input type="checkbox" id="news"> <label for="news">Newsletter</label>\n<input type="radio" name="gender" id="m"> <label for="m">Male</label>\n<input type="radio" name="gender" id="f"> <label for="f">Female</label>',
    lineByLine: 'Checkboxes are independent. Radio buttons with the same "name" (gender) are linked—picking one unpicks the others.',
    commonMistakes: [
      'Forgetting to give radio buttons the same "name" (which lets the user pick all of them!).',
      'Not using labels for these small inputs (they are very hard to click otherwise).',
      'Confusing when to use a checkbox vs a radio button.'
    ],
    practice: 'Create a radio group for "Favorite Season" (Spring, Summer, Fall, Winter).',
    challenge: 'How do you make a checkbox or radio button "checked" by default? (Hint: use the "checked" attribute).',
    reflectionQuestion: 'Why is it better to use radio buttons for "Yes/No" questions instead of checkboxes?',
    quiz: [
      {
        question: 'Which input type allows selecting multiple options at once?',
        options: ['radio', 'checkbox', 'text', 'submit'],
        correctIndex: 1,
        explanation: 'Checkboxes are designed for multiple independent selections.'
      },
      {
        question: 'How do you group radio buttons so only one can be picked?',
        options: ['Give them the same ID', 'Give them the same name', 'Put them in the same div', 'Use the same label'],
        correctIndex: 1,
        explanation: 'The name attribute links radio buttons into a single group.'
      }
    ],
    recap: 'Use checkboxes for multiple choices and radio buttons for single choices.'
  },
  'html-sem-1': {
    id: 'html-sem-1',
    title: 'Why Semantic HTML?',
    todayYouAreLearning: 'The importance of using tags that actually describe their content.',
    whyItMatters: 'Semantic HTML makes your code easier to read for humans, better for search engines (SEO), and accessible for screen readers.',
    explanation: 'In the past, developers used `<div>` tags for everything. HTML5 introduced "semantic" tags like `<header>`, `<nav>`, and `<footer>` which tell the browser exactly what that section of the page is.',
    analogy: 'Imagine a map. A non-semantic map is just a grid with no labels. A semantic map has labels for "Hospital", "Park", and "School". Which one is easier to use?',
    codeExample: '<!-- Non-semantic -->\n<div id="header">...</div>\n\n<!-- Semantic -->\n<header>...</header>',
    lineByLine: 'The <header> tag is built-in and meaningful. The <div> is generic and needs an ID to explain itself.',
    commonMistakes: [
      'Using <div> for everything (this is called "div-itis").',
      'Thinking semantic tags change the look of the page (they don\'t, they only change the meaning).',
      'Using semantic tags incorrectly (e.g., using <nav> for a single link).'
    ],
    practice: 'Look at a popular website and try to identify the header, footer, and navigation.',
    challenge: 'How many different semantic tags can you find in the HTML5 specification?',
    reflectionQuestion: 'How does a search engine like Google use semantic tags to understand your site?',
    quiz: [
      {
        question: 'What is the main benefit of Semantic HTML?',
        options: ['It makes the page faster', 'It adds colors', 'It provides meaning to the structure', 'It replaces CSS'],
        correctIndex: 2,
        explanation: 'Semantic tags describe the purpose of the content they contain.'
      },
      {
        question: 'Is a <div> tag semantic?',
        options: ['Yes', 'No'],
        correctIndex: 1,
        explanation: 'A <div> is a generic container with no inherent meaning.'
      }
    ],
    recap: 'Use semantic tags to give your code structure and meaning.'
  },
  'html-sem-2': {
    id: 'html-sem-2',
    title: 'Header & Footer',
    todayYouAreLearning: 'How to define the top and bottom sections of your website.',
    whyItMatters: 'Almost every website has a consistent header and footer. Using these tags helps browsers identify them immediately.',
    explanation: 'The `<header>` tag is for introductory content or navigation links at the top. The `<footer>` tag is for information at the bottom, like copyright, contact info, or site maps.',
    analogy: 'A website is like a person. The `<header>` is the hat/face (the first thing you see), and the `<footer>` is the shoes (the base that holds everything up).',
    codeExample: '<header>\n  <h1>My Blog</h1>\n</header>\n\n<footer>\n  <p>© 2024 My Name</p>\n</footer>',
    lineByLine: 'The <header> wraps the title. The <footer> wraps the copyright info.',
    commonMistakes: [
      'Confusing <header> with the <head> tag (remember: <head> is for metadata, <header> is for visible content).',
      'Putting the main content of your page inside the footer.',
      'Having multiple headers and footers in a way that confuses the structure.'
    ],
    practice: 'Add a header with a title and a footer with your name to your project.',
    challenge: 'Can you have a <header> inside an <article> tag? (Hint: Yes, you can!).',
    reflectionQuestion: 'Why do we usually put the logo and navigation in the header?',
    quiz: [
      {
        question: 'Which tag is used for the bottom section of a page?',
        options: ['<bottom>', '<end>', '<footer>', '<base>'],
        correctIndex: 2,
        explanation: 'The <footer> tag is the standard for the bottom area of a page.'
      },
      {
        question: 'What is the difference between <head> and <header>?',
        options: ['They are the same', '<head> is for metadata, <header> is for visible content', '<header> is for metadata, <head> is for visible content'],
        correctIndex: 1,
        explanation: '<head> is hidden info for the browser; <header> is the visible top of your page.'
      }
    ],
    recap: 'Use <header> and <footer> to define the boundaries of your page content.'
  },
  'html-sem-3': {
    id: 'html-sem-3',
    title: 'Nav & Main',
    todayYouAreLearning: 'How to define your navigation menu and your primary content area.',
    whyItMatters: 'The `<nav>` tag helps screen readers find the menu quickly, and `<main>` tells search engines where the "real" content is.',
    explanation: 'Use `<nav>` for major blocks of navigation links. Use `<main>` to wrap the unique, primary content of your page. You should only have one `<main>` tag per page.',
    analogy: 'In a building, the `<nav>` is the directory in the lobby. The `<main>` is the actual room or office where the important work happens.',
    codeExample: '<nav>\n  <a href="/">Home</a> | <a href="/about">About</a>\n</nav>\n<main>\n  <h2>Welcome to my site</h2>\n  <p>This is the main story.</p>\n</main>',
    lineByLine: '<nav> groups the links. <main> wraps the unique content of this specific page.',
    commonMistakes: [
      'Using more than one <main> tag on a page.',
      'Putting site-wide navigation inside the <main> tag (it should be outside or in the header).',
      'Using <nav> for every single link (only use it for major navigation blocks).'
    ],
    practice: 'Wrap your navigation links in a <nav> tag and your main text in a <main> tag.',
    challenge: 'Should the <footer> be inside the <main> tag? (Hint: No, it should be a sibling).',
    reflectionQuestion: 'How does a "Skip to Main Content" link help someone using a screen reader?',
    quiz: [
      {
        question: 'How many <main> tags should you have on one page?',
        options: ['As many as you want', 'Only one', 'Two', 'Zero'],
        correctIndex: 1,
        explanation: 'The <main> tag represents the unique content of the page, so there should only be one.'
      },
      {
        question: 'Which tag is specifically for a set of navigation links?',
        options: ['<links>', '<menu>', '<nav>', '<ul>'],
        correctIndex: 2,
        explanation: '<nav> is the semantic tag for navigation sections.'
      }
    ],
    recap: 'Use <nav> for menus and <main> for the primary content of your page.'
  },
  'html-sem-4': {
    id: 'html-sem-4',
    title: 'Article & Section',
    todayYouAreLearning: 'How to group related content into logical chunks.',
    whyItMatters: 'These tags help organize long pages into readable, meaningful parts.',
    explanation: 'Use `<article>` for content that could stand alone (like a blog post or a news story). Use `<section>` for grouping related content within a page or an article.',
    analogy: 'An `<article>` is like a single news story in a newspaper. A `<section>` is like the "Sports" or "Weather" section that contains many stories.',
    codeExample: '<main>\n  <section>\n    <h2>Latest News</h2>\n    <article>\n      <h3>New HTML Course!</h3>\n      <p>Learn HTML today...</p>\n    </article>\n  </section>\n</main>',
    lineByLine: '<section> groups the news. <article> is one specific, independent story.',
    commonMistakes: [
      'Using <article> when <section> is more appropriate (and vice versa).',
      'Using these tags just for styling (remember, they are for meaning!).',
      'Forgetting to include a heading (h2-h6) inside every section.'
    ],
    practice: 'Create a "Features" section for a product with three small articles inside it.',
    challenge: 'Can an <article> contain multiple <section> tags? (Hint: Yes!).',
    reflectionQuestion: 'When is a piece of content "independent" enough to be an article?',
    quiz: [
      {
        question: 'Which tag is best for a standalone blog post?',
        options: ['<section>', '<article>', '<div>', '<main>'],
        correctIndex: 1,
        explanation: '<article> is for content that makes sense even if removed from the rest of the page.'
      },
      {
        question: 'What is the primary use of the <section> tag?',
        options: ['To create a link', 'To group related content together', 'To add an image', 'To make text bold'],
        correctIndex: 1,
        explanation: '<section> is used to divide a page into thematic areas.'
      }
    ],
    recap: 'Use <article> for independent content and <section> for thematic grouping.'
  },
  'html-sem-5': {
    id: 'html-sem-5',
    title: 'Aside & Figure',
    todayYouAreLearning: 'How to handle sidebars, pull-quotes, and images with captions.',
    whyItMatters: 'These tags handle "extra" information and media in a way that is clear to both users and browsers.',
    explanation: 'The `<aside>` tag is for content that is "indirectly" related to the main content (like a sidebar or a "Did you know?" box). The `<figure>` tag wraps an image, and `<figcaption>` provides a caption for it.',
    analogy: 'An `<aside>` is like a "sidebar" in a magazine. A `<figure>` is like a diagram in a textbook with a caption underneath it.',
    codeExample: '<article>\n  <p>Main story text...</p>\n  <aside>Fun fact: HTML was made in 1991!</aside>\n  <figure>\n    <img src="tim.jpg" alt="Tim Berners-Lee">\n    <figcaption>The inventor of the web.</figcaption>\n  </figure>\n</article>',
    lineByLine: '<aside> provides extra context. <figure> groups the image and its caption together.',
    commonMistakes: [
      'Using <aside> for the main content of your page.',
      'Putting the <figcaption> outside of the <figure> tag.',
      'Using <aside> just to move something to the side (use CSS for that!).'
    ],
    practice: 'Add a "Fun Fact" sidebar to your blog post using <aside>.',
    challenge: 'Can you have more than one image inside a single <figure> tag?',
    reflectionQuestion: 'Why is a caption better than just a regular paragraph below an image?',
    quiz: [
      {
        question: 'Which tag is used for a sidebar or secondary content?',
        options: ['<sidebar>', '<aside>', '<extra>', '<margin>'],
        correctIndex: 1,
        explanation: '<aside> is the semantic tag for content that is related but separate from the main flow.'
      },
      {
        question: 'Which tag provides a caption for a <figure>?',
        options: ['<caption', '<desc>', '<figcaption>', '<label>'],
        correctIndex: 2,
        explanation: '<figcaption> is specifically used to label media inside a <figure>.'
      }
    ],
    recap: 'Use <aside> for sidebars and <figure> with <figcaption> for captioned media.'
  },
  'html-forms-adv-1': {
    id: 'html-forms-adv-1',
    title: 'Select Dropdowns',
    todayYouAreLearning: 'How to create a list of options that users can pick from a dropdown menu.',
    whyItMatters: 'Dropdowns save a lot of space on the screen and prevent users from making typing mistakes.',
    explanation: 'Use the `<select>` tag to create the dropdown box, and the `<option>` tag for each item inside the list.',
    analogy: 'A select menu is like a restaurant menu. You see one item at a time, but when you open it, you see all the choices available.',
    codeExample: '<label for="cars">Choose a car:</label>\n<select id="cars" name="cars">\n  <option value="volvo">Volvo</option>\n  <option value="saab">Saab</option>\n  <option value="mercedes">Mercedes</option>\n</select>',
    lineByLine: 'select creates the box. Each option has a "value" (what the server sees) and text (what the user sees).',
    commonMistakes: [
      'Forgetting to give each option a "value" attribute.',
      'Not using a label for your dropdown.',
      'Having too many options in one dropdown (it becomes hard to scroll).'
    ],
    practice: 'Create a dropdown menu for "Favorite Color" with at least 4 options.',
    challenge: 'How do you allow a user to select more than one option? (Hint: search for the "multiple" attribute).',
    reflectionQuestion: 'When is a dropdown better than a set of radio buttons?',
    quiz: [
      {
        question: 'Which tag creates the dropdown container?',
        options: ['<dropdown>', '<list>', '<select>', '<menu>'],
        correctIndex: 2,
        explanation: 'The <select> tag is used to create a dropdown list.'
      },
      {
        question: 'Which tag defines each individual choice in the list?',
        options: ['<choice>', '<item>', '<option>', '<pick>'],
        correctIndex: 2,
        explanation: 'The <option> tag defines the items within a <select> menu.'
      }
    ],
    recap: 'Use <select> and <option> to create compact choice lists.'
  },
  'html-forms-adv-2': {
    id: 'html-forms-adv-2',
    title: 'Textareas',
    todayYouAreLearning: 'How to create large boxes for multi-line text like comments or messages.',
    whyItMatters: 'Standard text inputs are only for one line. If you want a user to write a long message, you need a textarea.',
    explanation: 'The `<textarea>` tag creates a multi-line input. You can control its initial size using the `rows` and `cols` attributes.',
    analogy: 'A regular input is like a single line on a form. A textarea is like a large blank "Comments" section at the bottom of a page.',
    codeExample: '<label for="msg">Message:</label>\n<textarea id="msg" name="msg" rows="5" cols="30">\nType your message here...\n</textarea>',
    lineByLine: 'rows="5" makes it 5 lines tall. cols="30" makes it about 30 characters wide.',
    commonMistakes: [
      'Using <input type="text"> for long messages (it doesn\'t wrap text!).',
      'Forgetting that <textarea> has a closing tag (unlike <input>).',
      'Not realizing that users can usually resize textareas in their browser.'
    ],
    practice: 'Create a "Contact Us" message box that is 10 rows tall.',
    challenge: 'How do you prevent a user from resizing the textarea? (Hint: you\'ll need a bit of CSS: "resize: none").',
    reflectionQuestion: 'Why does textarea have its own tag instead of being an <input type="textarea">?',
    quiz: [
      {
        question: 'Which tag is used for multi-line text input?',
        options: ['<input type="big">', '<text>', '<textarea>', '<textbox>'],
        correctIndex: 2,
        explanation: '<textarea> is specifically designed for long-form text.'
      },
      {
        question: 'Does <textarea> have a closing tag?',
        options: ['Yes', 'No'],
        correctIndex: 0,
        explanation: 'Yes, <textarea> requires a closing </textarea> tag.'
      }
    ],
    recap: 'Use <textarea> for long-form user messages and comments.'
  },
  'html-forms-adv-3': {
    id: 'html-forms-adv-3',
    title: 'Specialized Input Types',
    todayYouAreLearning: 'How to use modern input types for emails, numbers, dates, and colors.',
    whyItMatters: 'Using the right type provides better keyboards on mobile phones and built-in validation in the browser.',
    explanation: 'HTML5 added many new types like `email`, `number`, `date`, `color`, and `range`. These help the browser understand exactly what kind of data is expected.',
    analogy: 'Specialized inputs are like specialized tools. You *could* use a rock to drive a nail, but a hammer (the right tool) works much better.',
    codeExample: '<input type="email" placeholder="email@example.com">\n<input type="number" min="1" max="10">\n<input type="date">\n<input type="color">',
    lineByLine: 'type="email" checks for an @ sign. type="number" only allows digits. type="date" opens a calendar.',
    commonMistakes: [
      'Using type="text" for everything (this makes mobile users frustrated!).',
      'Not using min/max for number inputs.',
      'Thinking these types work perfectly in every single old browser (they usually "fall back" to regular text).'
    ],
    practice: 'Create a form that asks for a user\'s birthday (date) and their favorite color (color).',
    challenge: 'What happens on an iPhone when you click an <input type="number">? Try it!',
    reflectionQuestion: 'How do these specialized types make the web more accessible?',
    quiz: [
      {
        question: 'Which input type shows a calendar on most browsers?',
        options: ['type="calendar"', 'type="date"', 'type="time"', 'type="day"'],
        correctIndex: 1,
        explanation: 'type="date" triggers the browser\'s native date picker.'
      },
      {
        question: 'What happens if you type plain text into a type="number" input?',
        options: ['The computer crashes', 'The browser will show an error on submission', 'It turns into a number', 'Nothing'],
        correctIndex: 1,
        explanation: 'Browsers provide built-in validation for specialized types.'
      }
    ],
    recap: 'Always use the most specific input type available for the best user experience.'
  },
  'html-forms-adv-4': {
    id: 'html-forms-adv-4',
    title: 'Form Validation',
    todayYouAreLearning: 'How to ensure users fill out your form correctly before they submit it.',
    whyItMatters: 'Validation prevents empty or broken data from reaching your server, which saves time and prevents errors.',
    explanation: 'You can use attributes like `required` (must not be empty), `minlength` (minimum characters), and `pattern` (regular expressions) to enforce rules.',
    analogy: 'Validation is like a bouncer at a club. If you don\'t have your ID (the right data), you aren\'t allowed to enter (submit the form).',
    codeExample: '<input type="text" required minlength="5">\n<input type="number" min="18" max="99">',
    lineByLine: 'required means the field cannot be blank. minlength="5" means it needs at least 5 letters.',
    commonMistakes: [
      'Relying *only* on HTML validation (smart users can bypass it—always validate on the server too!).',
      'Making too many fields required, which can annoy users.',
      'Not providing clear error messages when validation fails.'
    ],
    practice: 'Make a "Username" field that is required and must be at least 3 characters long.',
    challenge: 'How do you use the "pattern" attribute to only allow numbers? (Hint: search for "HTML pattern regex").',
    reflectionQuestion: 'Why is it better to catch an error in the browser than on the server?',
    quiz: [
      {
        question: 'Which attribute makes a field mandatory?',
        options: ['must', 'needed', 'required', 'force'],
        correctIndex: 2,
        explanation: 'The "required" attribute prevents form submission if the field is empty.'
      },
      {
        question: 'What does minlength="10" do?',
        options: ['Limits the width of the box', 'Requires at least 10 characters', 'Only allows 10 characters', 'Makes the font size 10'],
        correctIndex: 1,
        explanation: 'minlength enforces a minimum number of characters in a text input.'
      }
    ],
    recap: 'Use validation attributes to ensure your data is clean and complete.'
  },
  'html-forms-adv-5': {
    id: 'html-forms-adv-5',
    title: 'Grouping Inputs',
    todayYouAreLearning: 'How to organize large, complex forms into logical sections.',
    whyItMatters: 'Long forms can be overwhelming. Grouping related questions makes them much easier to understand and complete.',
    explanation: 'Use the `<fieldset>` tag to group related inputs together, and the `<legend>` tag to provide a title for that group.',
    analogy: 'Grouping is like putting related questions into a "box" on a paper form, like a section for "Personal Information" and another for "Shipping Address".',
    codeExample: '<fieldset>\n  <legend>Contact Info</legend>\n  <label>Email:</label> <input type="email">\n  <label>Phone:</label> <input type="tel">\n</fieldset>',
    lineByLine: '<fieldset> draws a border around the group. <legend> puts a title on that border.',
    commonMistakes: [
      'Using <div> instead of <fieldset> (fieldset is more semantic and accessible).',
      'Forgetting the <legend> tag (without it, the group has no name).',
      'Nesting fieldsets too deeply, which looks cluttered.'
    ],
    practice: 'Create a form with two fieldsets: "Account Details" and "Preferences".',
    challenge: 'Can you change the color of the fieldset border using CSS?',
    reflectionQuestion: 'How does grouping help someone who is feeling overwhelmed by a long form?',
    quiz: [
      {
        question: 'Which tag groups related form elements?',
        options: ['<group>', '<section>', '<fieldset>', '<box>'],
        correctIndex: 2,
        explanation: '<fieldset> is used to group related inputs logically.'
      },
      {
        question: 'Which tag provides a title for a <fieldset>?',
        options: ['<title>', '<caption>', '<legend>', '<label>'],
        correctIndex: 2,
        explanation: 'The <legend> tag acts as the title for the fieldset group.'
      }
    ],
    recap: 'Use <fieldset> and <legend> to organize and label sections of your forms.'
  },
  'html-media-1': {
    id: 'html-media-1',
    title: 'Embedding Audio',
    todayYouAreLearning: 'How to add music, podcasts, and sound effects to your website.',
    whyItMatters: 'Audio can make a website more engaging and is essential for accessibility (like providing an audio version of an article).',
    explanation: 'The `<audio>` tag is used to embed sound. You must include the `controls` attribute so the user can play, pause, and adjust the volume.',
    analogy: 'The `<audio>` tag is like a mini MP3 player that you stick onto your webpage.',
    codeExample: '<audio src="podcast.mp3" controls>\n  Your browser does not support the audio element.\n</audio>',
    lineByLine: 'src="..." is the path to the audio file. controls adds the play/pause buttons. The text inside is a fallback for old browsers.',
    commonMistakes: [
      'Forgetting the "controls" attribute (the audio will be invisible!).',
      'Using an unsupported audio format (MP3 is the most safe).',
      'Autoplaying loud music (this is very annoying to users!).'
    ],
    practice: 'Add an audio tag to your page with a sample MP3 link.',
    challenge: 'How do you make the audio start over automatically when it ends? (Hint: use the "loop" attribute).',
    reflectionQuestion: 'When is it appropriate to have audio play automatically?',
    quiz: [
      {
        question: 'Which attribute is required to show the play/pause buttons?',
        options: ['play', 'buttons', 'controls', 'show'],
        correctIndex: 2,
        explanation: 'The "controls" attribute tells the browser to display the native audio player UI.'
      },
      {
        question: 'What happens if the browser doesn\'t support the <audio> tag?',
        options: ['The computer crashes', 'It shows the fallback text inside the tags', 'It downloads the file automatically', 'Nothing happens'],
        correctIndex: 1,
        explanation: 'Browsers ignore tags they don\'t understand and show the content inside them instead.'
      }
    ],
    recap: 'Use <audio src="..." controls> to add sound to your site.'
  },
  'html-media-2': {
    id: 'html-media-2',
    title: 'Embedding Video',
    todayYouAreLearning: 'How to add movies and animations directly to your webpage.',
    whyItMatters: 'Video is the most powerful way to tell a story or demonstrate a product on the web.',
    explanation: 'The `<video>` tag works similarly to the `<audio>` tag. You should always provide a `width` and `height` to prevent the page from "jumping" while the video loads.',
    analogy: 'The `<video>` tag is like a TV screen that you\'ve built into your website\'s wall.',
    codeExample: '<video src="demo.mp4" width="640" height="360" controls>\n  Video not supported.\n</video>',
    lineByLine: 'width and height set the size. controls adds the player UI. src is the video file path.',
    commonMistakes: [
      'Not setting a width/height (causes "layout shift").',
      'Forgetting the "controls" attribute.',
      'Using massive video files that take forever to load.'
    ],
    practice: 'Embed a sample video and set its width to 400 pixels.',
    challenge: 'How do you provide multiple video formats (like MP4 and WebM) for better browser support? (Hint: use the <source> tag).',
    reflectionQuestion: 'Why is it often better to use YouTube instead of hosting your own video files?',
    quiz: [
      {
        question: 'Which tag is used to embed a video file?',
        options: ['<movie>', '<media>', '<video>', '<screen>'],
        correctIndex: 2,
        explanation: '<video> is the standard HTML5 tag for video content.'
      },
      {
        question: 'Why should you set a width and height for your video?',
        options: ['To make it load faster', 'To prevent the page layout from jumping', 'To change the video color', 'It is required by law'],
        correctIndex: 1,
        explanation: 'Setting dimensions reserves space on the page before the video actually loads.'
      }
    ],
    recap: 'Use <video src="..." controls> to add video content.'
  },
  'html-media-3': {
    id: 'html-media-3',
    title: 'Video Controls',
    todayYouAreLearning: 'How to customize how your video behaves (autoplay, loop, and more).',
    whyItMatters: 'Sometimes you want a video to act like a background animation (looping and muted) or a standard movie.',
    explanation: 'You can use attributes like `autoplay` (starts immediately), `muted` (no sound), `loop` (starts over), and `poster` (an image to show before the video starts).',
    analogy: 'Video attributes are like the settings on your DVD player or streaming app.',
    codeExample: '<video src="bg.mp4" autoplay muted loop poster="preview.jpg" width="100%">\n</video>',
    lineByLine: 'autoplay muted loop makes it act like a GIF. poster="..." shows an image while the video is downloading.',
    commonMistakes: [
      'Trying to autoplay a video with sound (most browsers will block this!).',
      'Using autoplay on a long video that users might not want to watch.',
      'Forgetting to mute an autoplaying video.'
    ],
    practice: 'Create a video that loops automatically and is muted.',
    challenge: 'Why do browsers require a video to be "muted" before it can "autoplay"?',
    reflectionQuestion: 'How does a "poster" image improve the user experience on a slow connection?',
    quiz: [
      {
        question: 'Which attribute makes a video start over when it ends?',
        options: ['repeat', 'again', 'loop', 'circle'],
        correctIndex: 2,
        explanation: 'The "loop" attribute tells the video to restart automatically.'
      },
      {
        question: 'What does the "poster" attribute do?',
        options: ['It prints the video', 'It shows an image before the video plays', 'It adds a title to the video', 'It makes the video full screen'],
        correctIndex: 1,
        explanation: 'The poster attribute specifies an image to be shown while the video is downloading, or until the user hits the play button.'
      }
    ],
    recap: 'Use video attributes to fine-tune the user experience.'
  },
  'html-media-4': {
    id: 'html-media-4',
    title: 'iFrames',
    todayYouAreLearning: 'How to embed content from other websites (like YouTube or Google Maps).',
    whyItMatters: 'iFrames allow you to bring in powerful tools and content from across the web without having to build them yourself.',
    explanation: 'The `<iframe>` tag (Inline Frame) creates a "window" to another website inside your own page. You use the `src` attribute to point to the external URL.',
    analogy: 'An iFrame is like a picture-in-picture window on your TV, or a window in your house that lets you look into your neighbor\'s yard.',
    codeExample: '<iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" width="560" height="315" frameborder="0"></iframe>',
    lineByLine: 'src is the URL of the external content. width and height set the frame size.',
    commonMistakes: [
      'Using iFrames for your own site\'s navigation (this is bad for SEO!).',
      'Forgetting to set a title attribute for accessibility (e.g., title="YouTube video player").',
      'Embedding sites that block iFrames for security reasons.'
    ],
    practice: 'Try to find the "Embed" code on a YouTube video and look at the <iframe> tag.',
    challenge: 'What does the "loading=\'lazy\'" attribute do for an iFrame?',
    reflectionQuestion: 'Why might a website block itself from being put in an iFrame?',
    quiz: [
      {
        question: 'What does "iFrame" stand for?',
        options: ['Internet Frame', 'Inline Frame', 'Image Frame', 'Internal Frame'],
        correctIndex: 1,
        explanation: 'iFrame stands for Inline Frame, which embeds another document within the current HTML document.'
      },
      {
        question: 'Which attribute tells the iFrame which website to show?',
        options: ['href', 'link', 'src', 'url'],
        correctIndex: 2,
        explanation: 'The src attribute specifies the address of the document to embed.'
      }
    ],
    recap: 'Use <iframe> to embed external content like maps and videos.'
  },
  'html-media-5': {
    id: 'html-media-5',
    title: 'SVG Graphics',
    todayYouAreLearning: 'How to add sharp, scalable icons and illustrations to your site.',
    whyItMatters: 'SVGs (Scalable Vector Graphics) never get blurry, no matter how much you zoom in. They are also very small in file size.',
    explanation: 'SVGs are actually written in XML (which looks just like HTML). You can embed the code directly in your HTML or use an `<img>` tag.',
    analogy: 'A regular image (like a JPG) is like a painting made of dots. An SVG is like a set of instructions for drawing a shape. You can follow the instructions at any size!',
    codeExample: '<svg width="100" height="100">\n  <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />\n</svg>',
    lineByLine: '<svg> is the container. <circle> draws a circle. cx/cy are the center coordinates. r is the radius.',
    commonMistakes: [
      'Using a complex SVG that has thousands of lines of code (it can slow down your page).',
      'Forgetting to add an "alt" text equivalent if using SVG as an image.',
      'Not understanding that SVGs can be styled with CSS!'
    ],
    practice: 'Create a simple SVG rectangle in your HTML.',
    challenge: 'How do you change the color of an SVG circle using CSS? (Hint: use the "fill" property).',
    reflectionQuestion: 'Why are SVGs perfect for company logos?',
    quiz: [
      {
        question: 'What is the main advantage of SVG over JPG?',
        options: ['It has more colors', 'It can be scaled to any size without losing quality', 'It is easier to take with a camera', 'It is always a square'],
        correctIndex: 1,
        explanation: 'SVGs are vector-based, meaning they are drawn using math, so they stay perfectly sharp at any size.'
      },
      {
        question: 'Can you write SVG code directly inside your HTML file?',
        options: ['Yes', 'No'],
        correctIndex: 0,
        explanation: 'Yes, browsers can read SVG code directly when it is placed inside HTML tags.'
      }
    ],
    recap: 'Use SVG for icons and illustrations that need to be sharp and scalable.'
  },
  'html-seo-1': {
    id: 'html-seo-1',
    title: 'The <title> Tag',
    todayYouAreLearning: 'How to name your page so it appears correctly in browser tabs and search results.',
    whyItMatters: 'The title is the most important piece of SEO (Search Engine Optimization). It\'s the first thing people see on Google.',
    explanation: 'The `<title>` tag goes inside the `<head>` section. It defines the text shown in the browser tab and the main link in search results.',
    analogy: 'The `<title>` is like the title on the spine of a book. It tells you exactly what is inside before you even open it.',
    codeExample: '<head>\n  <title>My Awesome Portfolio | Web Developer</title>\n</head>',
    lineByLine: 'The text between the tags is what the world sees as the name of your page.',
    commonMistakes: [
      'Leaving the title as "Document" or "Home" (this is terrible for SEO!).',
      'Making the title too long (Google will cut it off after about 60 characters).',
      'Using the same title for every page on your website.'
    ],
    practice: 'Change the title of your current project to something descriptive.',
    challenge: 'What is the ideal length for a page title?',
    reflectionQuestion: 'How does a good title help a user who has 20 tabs open?',
    quiz: [
      {
        question: 'Where does the <title> tag belong?',
        options: ['In the <body>', 'In the <head>', 'In the <footer>', 'In the <header>'],
        correctIndex: 1,
        explanation: 'The <title> is metadata and belongs in the <head> section.'
      },
      {
        question: 'Does the <title> appear directly on the webpage content?',
        options: ['Yes', 'No'],
        correctIndex: 1,
        explanation: 'No, it appears in the browser tab and search engine results, not the page body.'
      }
    ],
    recap: 'Always give every page a unique, descriptive <title>.'
  },
  'html-seo-2': {
    id: 'html-seo-2',
    title: 'Meta Descriptions',
    todayYouAreLearning: 'How to provide a summary of your page for search engines.',
    whyItMatters: 'The meta description is the "snippet" of text that appears under your title in Google. A good one can convince people to click on your link.',
    explanation: 'Use the `<meta>` tag with `name="description"` and a `content` attribute to provide your summary.',
    analogy: 'A meta description is like the "blurb" on the back of a book. It gives you a quick taste of the story to see if you want to read it.',
    codeExample: '<meta name="description" content="Learn HTML from scratch with our beginner-friendly course. Start your coding journey today!">',
    lineByLine: 'name="description" tells the browser what this meta tag is for. content="..." is the actual text.',
    commonMistakes: [
      'Not including a meta description at all.',
      'Stuffing it with keywords instead of writing a helpful sentence.',
      'Making it too long (keep it under 155 characters).'
    ],
    practice: 'Write a meta description for your personal homepage.',
    challenge: 'Does the meta description directly affect your ranking on Google? (Hint: No, but it affects your "Click-Through Rate").',
    reflectionQuestion: 'What kind of information makes you want to click a link in a search result?',
    quiz: [
      {
        question: 'What is the purpose of the meta description?',
        options: ['To set the page background', 'To provide a summary for search results', 'To list all the images', 'To hide the page from users'],
        correctIndex: 1,
        explanation: 'Meta descriptions provide the snippet of text seen in search engine results.'
      },
      {
        question: 'What is the recommended maximum length for a meta description?',
        options: ['50 characters', '155 characters', '500 characters', 'Unlimited'],
        correctIndex: 1,
        explanation: 'Around 155 characters is the sweet spot before search engines start cutting off the text.'
      }
    ],
    recap: 'Use meta descriptions to "sell" your page to potential visitors on search engines.'
  },
  'html-seo-3': {
    id: 'html-seo-3',
    title: 'Favicons',
    todayYouAreLearning: 'How to add a small icon to your browser tab.',
    whyItMatters: 'Favicons make your site look professional and help users find your tab when they have many open.',
    explanation: 'You use a `<link>` tag in the `<head>` to point to a small image file (usually a .ico or .png).',
    analogy: 'A favicon is like a tiny logo on a business card. It\'s a small detail that makes a big impression.',
    codeExample: '<link rel="icon" type="image/x-icon" href="/favicon.ico">',
    lineByLine: 'rel="icon" tells the browser this is the tab icon. href is the path to the image.',
    commonMistakes: [
      'Using a favicon that is too complex (it will just look like a blob at 16x16 pixels).',
      'Forgetting to include one (browsers will show a generic "blank page" icon).',
      'Using a very large image file for a tiny icon.'
    ],
    practice: 'Find a small icon online and try to add it as a favicon to your page.',
    challenge: 'What are the standard dimensions for a favicon? (Hint: 16x16 or 32x32).',
    reflectionQuestion: 'How does a favicon help with "branding" your website?',
    quiz: [
      {
        question: 'Which tag is used to add a favicon?',
        options: ['<icon>', '<meta>', '<link>', '<image>'],
        correctIndex: 2,
        explanation: 'The <link> tag is used to connect external resources like icons and stylesheets.'
      },
      {
        question: 'Where does the favicon appear?',
        options: ['In the middle of the page', 'In the browser tab', 'At the bottom of the page', 'Only on mobile'],
        correctIndex: 1,
        explanation: 'Favicons appear in browser tabs, bookmarks, and address bars.'
      }
    ],
    recap: 'Add a favicon to give your site a professional, branded look.'
  },
  'html-seo-4': {
    id: 'html-seo-4',
    title: 'Social Media Meta',
    todayYouAreLearning: 'How to control how your site looks when shared on Facebook or Twitter.',
    whyItMatters: 'When you share a link, you want it to show a nice image and a clear title, not just a plain URL.',
    explanation: 'We use "Open Graph" (og:) tags for Facebook and "Twitter Cards" for Twitter. These are special meta tags.',
    analogy: 'Social media meta tags are like the "packaging" on a product. They make the link look attractive so people want to "open" it.',
    codeExample: '<meta property="og:title" content="My Awesome Site">\n<meta property="og:image" content="preview.jpg">\n<meta name="twitter:card" content="summary_large_image">',
    lineByLine: 'og:title is the title for Facebook. og:image is the picture that shows up.',
    commonMistakes: [
      'Not testing your links (use the "Facebook Sharing Debugger"!).',
      'Using an image that is the wrong size (it might get cropped weirdly).',
      'Forgetting to update these tags when you change your site content.'
    ],
    practice: 'Look at the source code of a news site and search for "og:".',
    challenge: 'What is the "Open Graph" protocol?',
    reflectionQuestion: 'Why do companies spend so much time on their social media preview images?',
    quiz: [
      {
        question: 'Which prefix is used for Facebook social tags?',
        options: ['fb:', 'social:', 'og:', 'meta:'],
        correctIndex: 2,
        explanation: 'og: stands for Open Graph, the standard created by Facebook.'
      },
      {
        question: 'What does og:image define?',
        options: ['The background of your site', 'The image shown when the link is shared', 'The logo in the header', 'The user\'s profile picture'],
        correctIndex: 1,
        explanation: 'og:image specifies the preview image for social media shares.'
      }
    ],
    recap: 'Use Open Graph and Twitter meta tags to control your site\'s appearance on social media.'
  },
  'html-seo-5': {
    id: 'html-seo-5',
    title: 'The Viewport Meta',
    todayYouAreLearning: 'How to make sure your website looks good on mobile phones.',
    whyItMatters: 'Without this tag, mobile browsers will try to show your desktop site at a tiny size, making it impossible to read.',
    explanation: 'The viewport meta tag tells the browser to set the width of the page to the width of the device screen.',
    analogy: 'The viewport tag is like a pair of glasses for a mobile phone. It helps the phone "see" the website at the correct size.',
    codeExample: '<meta name="viewport" content="width=device-width, initial-scale=1.0">',
    lineByLine: 'width=device-width makes the site match the phone width. initial-scale=1.0 sets the zoom level to normal.',
    commonMistakes: [
      'Forgetting this tag (your site will look tiny on mobile!).',
      'Setting "user-scalable=no" (this prevents users from zooming in, which is bad for accessibility).',
      'Using a fixed width like 1200px instead of device-width.'
    ],
    practice: 'Check if your current project has the viewport meta tag in the <head>.',
    challenge: 'What happens if you remove the viewport tag and view your site on a phone?',
    reflectionQuestion: 'Why is "mobile-first" design so important today?',
    quiz: [
      {
        question: 'What is the primary purpose of the viewport meta tag?',
        options: ['To change the page color', 'To make the site responsive on mobile', 'To speed up the site', 'To track users'],
        correctIndex: 1,
        explanation: 'The viewport tag ensures the site scales correctly on different screen sizes.'
      },
      {
        question: 'What does "initial-scale=1.0" mean?',
        options: ['The site is 100 years old', 'The default zoom level is 100%', 'The site only has one page', 'The site is very small'],
        correctIndex: 1,
        explanation: 'It sets the initial zoom level when the page is first loaded.'
      }
    ],
    recap: 'Always include the viewport meta tag for a mobile-friendly website.'
  },
  'html-a11y-1': {
    id: 'html-a11y-1',
    title: 'What is Accessibility?',
    todayYouAreLearning: 'The practice of making your website usable by everyone, including people with disabilities.',
    whyItMatters: 'The web should be for everyone. Good accessibility (a11y) helps people who are blind, deaf, or have motor impairments.',
    explanation: 'Accessibility means using proper HTML tags, providing text for images, and ensuring your site can be used with just a keyboard.',
    analogy: 'Accessibility is like building a ramp next to a set of stairs. It doesn\'t hurt the people using the stairs, but it\'s essential for the person in a wheelchair.',
    codeExample: '<!-- Good: Descriptive link -->\n<a href="/docs">Download the HTML Guide (PDF)</a>\n\n<!-- Bad: Vague link -->\n<a href="/docs">Click here</a>',
    lineByLine: 'Descriptive links tell screen reader users exactly where they are going.',
    commonMistakes: [
      'Thinking accessibility is "extra work" (it should be part of your normal workflow!).',
      'Only designing for people who use a mouse.',
      'Ignoring color contrast (making text too light to read).'
    ],
    practice: 'Try navigating a website using only your "Tab" and "Enter" keys.',
    challenge: 'What does the abbreviation "a11y" stand for? (Hint: count the letters between A and Y in "accessibility").',
    reflectionQuestion: 'How does a well-structured website help someone who is blind?',
    quiz: [
      {
        question: 'Who benefits from web accessibility?',
        options: ['Only blind people', 'Only elderly people', 'Everyone', 'Only developers'],
        correctIndex: 2,
        explanation: 'Accessibility improvements often make the site better for all users.'
      },
      {
        question: 'What is a common tool used by blind people to browse the web?',
        options: ['A magnifying glass', 'A screen reader', 'A special mouse', 'A louder speaker'],
        correctIndex: 1,
        explanation: 'Screen readers turn on-screen text into speech or braille.'
      }
    ],
    recap: 'Accessibility (a11y) is about making the web inclusive for all users.'
  },
  'html-a11y-2': {
    id: 'html-a11y-2',
    title: 'Alt Text Revisited',
    todayYouAreLearning: 'How to write truly helpful descriptions for your images.',
    whyItMatters: 'Alt text is the only way a blind person knows what is in an image. It also shows up if the image fails to load.',
    explanation: 'Good alt text describes the *purpose* and *content* of the image. If an image is just for decoration, you should use an empty alt attribute (`alt=""`).',
    analogy: 'Alt text is like describing a photo to a friend over the phone. You don\'t need to describe every pixel, just what matters.',
    codeExample: '<img src="dog.jpg" alt="A golden retriever puppy playing in the grass.">\n<img src="divider.png" alt=""> <!-- Decorative -->',
    lineByLine: 'The first alt is descriptive. The second is empty because the image is just a decoration.',
    commonMistakes: [
      'Starting with "Image of..." or "Photo of..." (the screen reader already says it\'s an image).',
      'Leaving the alt attribute out entirely (this is a big error!).',
      'Using the filename (like "IMG_1234.jpg") as the alt text.'
    ],
    practice: 'Write alt text for a photo of your favorite food.',
    challenge: 'When should you use an empty alt attribute (alt="")?',
    reflectionQuestion: 'How would you feel if you were browsing a site and every image was described as "image"?',
    quiz: [
      {
        question: 'What should you do for a decorative image that adds no meaning?',
        options: ['Delete it', 'Use alt="decoration"', 'Use an empty alt=""', 'Write a long description'],
        correctIndex: 2,
        explanation: 'An empty alt attribute tells screen readers to skip the image.'
      },
      {
        question: 'Should you start alt text with "A picture of..."?',
        options: ['Yes', 'No'],
        correctIndex: 1,
        explanation: 'No, screen readers already announce that it is an image.'
      }
    ],
    recap: 'Write descriptive, meaningful alt text for all important images.'
  },
  'html-a11y-3': {
    id: 'html-a11y-3',
    title: 'ARIA Roles',
    todayYouAreLearning: 'How to give extra meaning to elements when standard HTML tags aren\'t enough.',
    whyItMatters: 'ARIA (Accessible Rich Internet Applications) helps bridge the gap between complex web apps and assistive technology.',
    explanation: 'ARIA attributes like `role`, `aria-label`, and `aria-hidden` provide extra information to screen readers. You should only use them if there isn\'t a semantic HTML tag that does the job.',
    analogy: 'ARIA is like a sticky note you put on a generic box to explain what\'s inside.',
    codeExample: '<div role="button" aria-label="Close modal">X</div>\n<span aria-hidden="true">★</span>',
    lineByLine: 'role="button" tells the browser to treat the div like a button. aria-hidden="true" hides the star from screen readers.',
    commonMistakes: [
      'Using ARIA when a semantic tag exists (e.g., using <div role="button"> instead of <button>).',
      'Using ARIA incorrectly, which can actually make the site *less* accessible.',
      'Overusing ARIA (the first rule of ARIA is: Don\'t use ARIA if you don\'t have to!).'
    ],
    practice: 'Find an example of an `aria-label` on a website (often found on "Close" buttons with icons).',
    challenge: 'What is the "First Rule of ARIA"?',
    reflectionQuestion: 'Why is it better to use a real <button> than a <div role="button">?',
    quiz: [
      {
        question: 'What does ARIA stand for?',
        options: ['Advanced Responsive Image Area', 'Accessible Rich Internet Applications', 'Always Read Important Assets', 'Automated Robot Interaction Area'],
        correctIndex: 1,
        explanation: 'ARIA is a set of attributes that make web content more accessible.'
      },
      {
        question: 'When should you use ARIA?',
        options: ['For every tag', 'Only when standard HTML tags are not enough', 'To make the site faster', 'To hide code from Google'],
        correctIndex: 1,
        explanation: 'Standard semantic HTML is always preferred over ARIA.'
      }
    ],
    recap: 'Use ARIA sparingly to enhance accessibility when semantic HTML is not enough.'
  },
  'html-a11y-4': {
    id: 'html-a11y-4',
    title: 'Keyboard Navigation',
    todayYouAreLearning: 'How to ensure your site can be used without a mouse.',
    whyItMatters: 'Many users (including those with motor impairments or power users) rely on the keyboard to navigate.',
    explanation: 'Interactive elements like links, buttons, and form inputs are "focusable" by default. You should never remove the "focus ring" (the outline that shows which element is selected).',
    analogy: 'Keyboard navigation is like using the remote to move through a Netflix menu. You need to see the highlight to know what you\'re picking.',
    codeExample: '<!-- Good: Standard button is focusable -->\n<button>Click Me</button>\n\n<!-- Bad: Div is NOT focusable by default -->\n<div onclick="doSomething()">Click Me</div>',
    lineByLine: 'The <button> can be reached with the Tab key. The <div> cannot.',
    commonMistakes: [
      'Removing the CSS focus outline (outline: none) without providing a better alternative.',
      'Using non-interactive tags (like <div> or <span>) for buttons.',
      'Creating a "trap" where a user can get into a section but can\'t Tab out of it.'
    ],
    practice: 'Try to "Tab" through your entire project. Can you reach every link and button?',
    challenge: 'How do you make a <div> focusable? (Hint: search for the "tabindex" attribute).',
    reflectionQuestion: 'How does it feel to try and use a site when you can\'t see where the "focus" is?',
    quiz: [
      {
        question: 'Which key is most commonly used to move between interactive elements?',
        options: ['Space', 'Enter', 'Tab', 'Shift'],
        correctIndex: 2,
        explanation: 'The Tab key moves the focus forward through the page.'
      },
      {
        question: 'Is it okay to remove the focus outline from buttons?',
        options: ['Yes, it looks better', 'No, it breaks navigation for keyboard users', 'Only if the button is red', 'Only on mobile'],
        correctIndex: 1,
        explanation: 'The focus outline is essential for knowing which element is currently active.'
      }
    ],
    recap: 'Ensure all interactive elements are reachable and visible via the keyboard.'
  },
  'html-a11y-5': {
    id: 'html-a11y-5',
    title: 'Color Contrast',
    todayYouAreLearning: 'How to ensure your text is easy to read against its background.',
    whyItMatters: 'Millions of people have low vision or color blindness. If your contrast is too low, they won\'t be able to read your content.',
    explanation: 'You should always aim for a contrast ratio of at least 4.5:1 for normal text. There are many free tools to check this.',
    analogy: 'Color contrast is like the volume of a voice. If it\'s too quiet (low contrast), nobody can hear (read) what you\'re saying.',
    codeExample: '<!-- Good: High contrast -->\n<p style="color: black; background: white;">Readable text</p>\n\n<!-- Bad: Low contrast -->\n<p style="color: #ccc; background: #eee;">Hard to read</p>',
    lineByLine: 'Black on white is the highest contrast. Light gray on off-white is very poor.',
    commonMistakes: [
      'Using light gray text on a white background.',
      'Putting text over a busy image without a background color.',
      'Relying *only* on color to convey meaning (e.g., "Click the red button" - what if the user is colorblind?).'
    ],
    practice: 'Use a "Color Contrast Checker" tool on your favorite website.',
    challenge: 'What is the WCAG (Web Content Accessibility Guidelines) standard for contrast?',
    reflectionQuestion: 'How does high contrast help you when you are outside in bright sunlight?',
    quiz: [
      {
        question: 'What is the recommended minimum contrast ratio for normal text?',
        options: ['1:1', '2:1', '4.5:1', '10:1'],
        correctIndex: 2,
        explanation: '4.5:1 is the standard for "Level AA" accessibility.'
      },
      {
        question: 'Should you use color as the ONLY way to show an error?',
        options: ['Yes', 'No'],
        correctIndex: 1,
        explanation: 'No, you should also use icons or text labels for users who can\'t distinguish colors.'
      }
    ],
    recap: 'Always use high-contrast colors to ensure your text is readable by everyone.'
  },
  'html-best-1': {
    id: 'html-best-1',
    title: 'Clean Code',
    todayYouAreLearning: 'How to write code that is easy for humans to read and maintain.',
    whyItMatters: 'You spend more time reading code than writing it. Clean code makes debugging and collaboration much easier.',
    explanation: 'Clean HTML uses consistent indentation (usually 2 spaces), lowercase tag names, and meaningful attribute values.',
    analogy: 'Clean code is like a well-organized library. You can find exactly what you need without searching through piles of messy papers.',
    codeExample: '<!-- Good: Clean and readable -->\n<div>\n  <h1>Welcome</h1>\n  <p>This is a clean paragraph.</p>\n</div>\n\n<!-- Bad: Messy and hard to read -->\n<DIV><h1>Welcome</h1><p>This is messy.</p></DIV>',
    lineByLine: 'The good example uses indentation to show that <h1> and <p> are inside the <div>.',
    commonMistakes: [
      'Mixing uppercase and lowercase tags (e.g., <DIV> instead of <div>).',
      'Inconsistent indentation (makes it hard to see which tags are nested).',
      'Leaving unnecessary empty lines everywhere.'
    ],
    practice: 'Take a messy piece of HTML and reformat it with proper indentation.',
    challenge: 'What is a "Linter" and how does it help with clean code?',
    reflectionQuestion: 'Why does clean code matter even if the browser can still read messy code?',
    quiz: [
      {
        question: 'Which of these is a characteristic of clean HTML?',
        options: ['Using all caps for tags', 'Consistent indentation', 'No comments allowed', 'Putting all code on one line'],
        correctIndex: 1,
        explanation: 'Indentation helps visualize the structure of the document.'
      },
      {
        question: 'Why should you use lowercase for HTML tags?',
        options: ['It is a law', 'It is the industry standard and easier to read', 'Uppercase tags don\'t work', 'It saves battery life'],
        correctIndex: 1,
        explanation: 'While HTML is case-insensitive, lowercase is the universal standard for modern web development.'
      }
    ],
    recap: 'Write clean, indented, lowercase code for better readability.'
  },
  'html-best-2': {
    id: 'html-best-2',
    title: 'Commenting Your Code',
    todayYouAreLearning: 'How to leave notes for yourself and other developers inside your code.',
    whyItMatters: 'Comments explain the "why" behind your code, helping you remember what you were doing when you come back to it later.',
    explanation: 'HTML comments start with `<!--` and end with `-->`. The browser completely ignores them, so they don\'t show up on the page.',
    analogy: 'Comments are like sticky notes you put in a textbook to remind yourself of important points.',
    codeExample: '<!-- This section contains the main navigation menu -->\n<nav>\n  <ul>\n    <li>Home</li>\n  </ul>\n</nav>',
    lineByLine: 'The text inside the <!-- and --> is a comment. It won\'t be visible to users.',
    commonMistakes: [
      'Commenting every single line (this makes the code harder to read).',
      'Leaving "dead code" (old code you don\'t use) inside comments instead of deleting it.',
      'Putting sensitive information (like passwords) in comments (anyone can see them in the source code!).'
    ],
    practice: 'Add a comment to your project explaining what the "header" section does.',
    challenge: 'Can you put a comment inside an HTML tag? (e.g., <p <!-- comment -->>). Try it and see!',
    reflectionQuestion: 'When is a comment more helpful than just having clean code?',
    quiz: [
      {
        question: 'How do you start an HTML comment?',
        options: ['//', '/*', '<!--', '#'],
        correctIndex: 2,
        explanation: '<!-- is the opening tag for an HTML comment.'
      },
      {
        question: 'Will users see your comments on the actual webpage?',
        options: ['Yes', 'No'],
        correctIndex: 1,
        explanation: 'Comments are only visible in the source code, not the rendered page.'
      }
    ],
    recap: 'Use comments to explain complex sections of your code.'
  },
  'html-best-3': {
    id: 'html-best-3',
    title: 'Naming Conventions',
    todayYouAreLearning: 'How to name your files and IDs so they are professional and bug-free.',
    whyItMatters: 'Inconsistent naming can lead to broken links and confusion when working in a team.',
    explanation: 'For filenames, always use lowercase and hyphens (kebab-case). Avoid spaces and special characters.',
    analogy: 'Naming conventions are like a filing system in an office. If everyone uses a different system, nobody can find anything.',
    codeExample: '<!-- Good filenames -->\nabout-us.html\ncontact-page.html\n\n<!-- Bad filenames -->\nAbout Us.html\nContactPage.HTML',
    lineByLine: 'The good examples use all lowercase and hyphens instead of spaces.',
    commonMistakes: [
      'Using spaces in filenames (this creates messy URLs like %20).',
      'Using uppercase letters (some servers are case-sensitive, which can break links).',
      'Using vague names like "page1.html" or "stuff.html".'
    ],
    practice: 'Rename any files in your project that use spaces or uppercase letters.',
    challenge: 'Why is "index.html" a special filename in web development?',
    reflectionQuestion: 'Why is "kebab-case" (my-file-name) preferred over "snake_case" (my_file_name) for URLs?',
    quiz: [
      {
        question: 'Which of these is the best filename for a "Contact Us" page?',
        options: ['Contact Us.html', 'contact_us.html', 'contact-us.html', 'ContactUs.HTML'],
        correctIndex: 2,
        explanation: 'Kebab-case (lowercase with hyphens) is the web standard for filenames.'
      },
      {
        question: 'Why should you avoid spaces in filenames?',
        options: ['They make the file bigger', 'They are converted to %20 in URLs, which is messy', 'Computers can\'t read spaces', 'They are illegal'],
        correctIndex: 1,
        explanation: 'Spaces in URLs are encoded as %20, making them hard to read and share.'
      }
    ],
    recap: 'Use lowercase and hyphens for all your filenames and IDs.'
  },
  'html-best-4': {
    id: 'html-best-4',
    title: 'Validation',
    todayYouAreLearning: 'How to check your code for errors using official tools.',
    whyItMatters: 'Even if a page looks fine, hidden errors can cause problems in different browsers or for screen readers.',
    explanation: 'The W3C Markup Validation Service is the official tool for checking if your HTML follows the rules.',
    analogy: 'Validation is like a grammar and spell checker for your code. It ensures you haven\'t missed any "punctuation" (like closing tags).',
    codeExample: '<!-- A common error that a validator would catch -->\n<p>This tag is never closed.\n<div>Something else</div>',
    lineByLine: 'The validator would warn you that the <p> tag is missing its closing </p>.',
    commonMistakes: [
      'Ignoring validation errors because the site "looks okay" in your browser.',
      'Thinking that a "warning" is the same as an "error" (warnings are suggestions, errors are broken rules).',
      'Not validating your code regularly during development.'
    ],
    practice: 'Go to validator.w3.org and paste your HTML code to see if it has any errors.',
    challenge: 'Can you get a "Perfect" score with zero errors and zero warnings?',
    reflectionQuestion: 'Why do different browsers sometimes show the same broken code differently?',
    quiz: [
      {
        question: 'What is the official tool for checking HTML code?',
        options: ['Google Search', 'W3C Validator', 'Adobe Photoshop', 'Microsoft Word'],
        correctIndex: 1,
        explanation: 'The W3C Validator is the industry standard for checking HTML syntax.'
      },
      {
        question: 'Does a page have to be 100% valid to show up in a browser?',
        options: ['Yes', 'No'],
        correctIndex: 1,
        explanation: 'Browsers try their best to show even broken code, but it can lead to unpredictable bugs.'
      }
    ],
    recap: 'Always validate your code to ensure it follows web standards.'
  },
  'html-best-5': {
    id: 'html-best-5',
    title: 'Avoiding Deprecated Tags',
    todayYouAreLearning: 'How to stay up-to-date by avoiding old, "retired" HTML tags.',
    whyItMatters: 'Deprecated tags are no longer supported by modern standards and might stop working in future browsers.',
    explanation: 'Tags like `<center>`, `<font>`, and `<big>` should be avoided. Use CSS for all styling and layout instead.',
    analogy: 'Using deprecated tags is like using a rotary phone in the age of smartphones. It might still work, but it\'s outdated and inefficient.',
    codeExample: '<!-- Bad: Deprecated tag -->\n<center>This is old</center>\n\n<!-- Good: Modern CSS -->\n<div style="text-align: center;">This is modern</div>',
    lineByLine: 'The second example uses a style attribute (CSS) instead of an old HTML tag.',
    commonMistakes: [
      'Using old tags found in outdated tutorials or forum posts.',
      'Using HTML tags for styling (like <center>) instead of CSS.',
      'Thinking that "deprecated" means "it doesn\'t work at all" (it still works, but it\'s bad practice).'
    ],
    practice: 'Check your project for any old tags like <center> or <font> and replace them.',
    challenge: 'What replaced the `<strike>` tag in modern HTML? (Hint: search for the `<s>` and `<del>` tags).',
    reflectionQuestion: 'Why does the web evolve and retire old tags?',
    quiz: [
      {
        question: 'What does "deprecated" mean in web development?',
        options: ['The tag is brand new', 'The tag is no longer recommended and is being retired', 'The tag is only for mobile', 'The tag is a secret'],
        correctIndex: 1,
        explanation: 'Deprecated features are outdated and should be replaced with modern alternatives.'
      },
      {
        question: 'Which of these tags is deprecated?',
        options: ['<div>', '<center>', '<main>', '<section>'],
        correctIndex: 1,
        explanation: '<center> is an old tag that has been replaced by CSS styling.'
      }
    ],
    recap: 'Use modern HTML5 tags and keep styling in CSS.'
  },
  'html-perf-1': {
    id: 'html-perf-1',
    title: 'Lazy Loading Images',
    todayYouAreLearning: 'How to make your website load faster by only loading images when they are needed.',
    whyItMatters: 'Loading all images at once can make a page very slow, especially on mobile phones with slow internet.',
    explanation: 'By adding `loading="lazy"` to your `<img>` tags, the browser will wait to download the image until the user scrolls near it.',
    analogy: 'Lazy loading is like a restaurant only bringing out your main course when you\'ve finished your appetizer, instead of putting all the food on the table at once.',
    codeExample: '<img src="large-photo.jpg" alt="A beautiful landscape" loading="lazy">',
    lineByLine: 'loading="lazy" tells the browser: "Don\'t download this yet if it\'s not on the screen."',
    commonMistakes: [
      'Lazy loading images at the very top of the page (this actually makes the page feel slower!).',
      'Forgetting to set width and height on lazy-loaded images (causes layout jumps).',
      'Using it on every single small icon (it\'s best for large photos).'
    ],
    practice: 'Add loading="lazy" to an image that is located at the bottom of your page.',
    challenge: 'How can you verify that an image is being "lazy loaded" using the browser\'s Network tab?',
    reflectionQuestion: 'How does lazy loading help users who have to pay for every megabyte of data they use?',
    quiz: [
      {
        question: 'What does loading="lazy" do?',
        options: ['Makes the image blurry', 'Delays loading the image until it is near the viewport', 'Makes the image smaller', 'Deletes the image'],
        correctIndex: 1,
        explanation: 'Lazy loading saves bandwidth by only downloading images when the user is likely to see them.'
      },
      {
        question: 'Should you lazy load the main logo at the top of your page?',
        options: ['Yes', 'No'],
        correctIndex: 1,
        explanation: 'No, images at the top of the page should load immediately so the user sees them right away.'
      }
    ],
    recap: 'Use loading="lazy" to speed up your site for images further down the page.'
  },
  'html-perf-2': {
    id: 'html-perf-2',
    title: 'Preloading Assets',
    todayYouAreLearning: 'How to tell the browser which files are the most important to download first.',
    whyItMatters: 'Sometimes the browser doesn\'t realize it needs a file (like a font or a main style) until it\'s too late. Preloading fixes this.',
    explanation: 'Use the `<link>` tag with `rel="preload"` in the `<head>` to start downloading critical files immediately.',
    analogy: 'Preloading is like calling a restaurant to order your food before you even leave your house, so it\'s ready the moment you arrive.',
    codeExample: '<head>\n  <link rel="preload" href="main-font.woff2" as="font" type="font/woff2" crossorigin>\n</head>',
    lineByLine: 'rel="preload" starts the download. as="font" tells the browser what kind of file it is.',
    commonMistakes: [
      'Preloading too many files (this clogs up the connection and slows everything down).',
      'Forgetting the "as" attribute (the browser won\'t know how to handle the file).',
      'Preloading files that aren\'t actually used on the page.'
    ],
    practice: 'Write a preload tag for a hypothetical CSS file named "critical.css".',
    challenge: 'What is the difference between "preload" and "prefetch"?',
    reflectionQuestion: 'What are the top 3 most important files on a typical website?',
    quiz: [
      {
        question: 'Where should you put your preload tags?',
        options: ['At the bottom of the <body>', 'Inside the <head>', 'In a separate file', 'In the <footer>'],
        correctIndex: 1,
        explanation: 'Preload tags belong in the <head> so the browser sees them as early as possible.'
      },
      {
        question: 'What happens if you preload too many assets?',
        options: ['The site gets faster', 'The site might get slower because of too many simultaneous downloads', 'The browser crashes', 'Nothing happens'],
        correctIndex: 1,
        explanation: 'Preloading should be reserved for the most critical resources only.'
      }
    ],
    recap: 'Use rel="preload" for critical assets like fonts and main stylesheets.'
  },
  'html-perf-3': {
    id: 'html-perf-3',
    title: 'Minimizing HTML Size',
    todayYouAreLearning: 'How to reduce the weight of your HTML files so they travel faster.',
    whyItMatters: 'Smaller files mean faster downloads, which is crucial for users on slow mobile networks.',
    explanation: 'Minimization involves removing unnecessary spaces, new lines, and comments from your final code.',
    analogy: 'Minimizing code is like vacuum-sealing your clothes for a trip. It\'s the same stuff, but it takes up much less space.',
    codeExample: '<!-- Before -->\n<div>\n  <p> Hello </p>\n</div>\n\n<!-- After -->\n<div><p>Hello</p></div>',
    lineByLine: 'The "After" version has no extra spaces or new lines, making it a smaller file.',
    commonMistakes: [
      'Minifying your *source* code (you should keep your working code readable and only minify the version you send to the server).',
      'Thinking that a few spaces don\'t matter (on a large site, they can add up to a lot of extra data).',
      'Manually minifying code (use a tool instead!).'
    ],
    practice: 'Search for an "HTML Minifier" online and see how much it shrinks a piece of code.',
    challenge: 'How much space can you save on a typical webpage by minifying the HTML?',
    reflectionQuestion: 'Does the computer care if the code is pretty or ugly?',
    quiz: [
      {
        question: 'What is "minification"?',
        options: ['Making the font smaller', 'Removing unnecessary characters like spaces and comments', 'Deleting half the code', 'Compressing images'],
        correctIndex: 1,
        explanation: 'Minification reduces file size without changing how the code works.'
      },
      {
        question: 'Should you minify the code you are currently editing?',
        options: ['Yes', 'No, keep it readable for yourself'],
        correctIndex: 1,
        explanation: 'Always keep your source code readable. Minification is for the final "production" version.'
      }
    ],
    recap: 'Smaller HTML files lead to faster page loads and happier users.'
  },
  'html-perf-4': {
    id: 'html-perf-4',
    title: 'Critical CSS & Scripts',
    todayYouAreLearning: 'How to organize your files so the page shows up as quickly as possible.',
    whyItMatters: 'If you load a huge JavaScript file at the top of your page, the user will see a blank screen until it finishes downloading.',
    explanation: 'Put your CSS in the `<head>` so the page is styled immediately. Put your `<script>` tags at the very end of the `<body>` so they don\'t block the content.',
    analogy: 'It\'s like putting the instructions for a toy at the top of the box, but the batteries at the bottom. You need the instructions first to know what you\'re building!',
    codeExample: '<head>\n  <link rel="stylesheet" href="styles.css">\n</head>\n<body>\n  <h1>Content</h1>\n  <script src="app.js"></script>\n</body>',
    lineByLine: 'The stylesheet is in the head. The script is at the very bottom of the body.',
    commonMistakes: [
      'Putting large scripts in the <head> (this causes "render blocking").',
      'Loading unnecessary scripts on pages that don\'t need them.',
      'Not using the "async" or "defer" attributes for modern script loading.'
    ],
    practice: 'Move any script tags in your project to the bottom of the <body>.',
    challenge: 'What is the "Flash of Unstyled Content" (FOUC)?',
    reflectionQuestion: 'Why is it better for a user to see unstyled text than a blank screen?',
    quiz: [
      {
        question: 'Where is the best place to put your main <script> tags?',
        options: ['In the <head>', 'At the top of the <body>', 'At the bottom of the <body>', 'In the <footer>'],
        correctIndex: 2,
        explanation: 'Putting scripts at the bottom prevents them from slowing down the initial page display.'
      },
      {
        question: 'Why do we put CSS in the <head>?',
        options: ['To make the file smaller', 'So the page is styled as it loads', 'Because it is required by law', 'To hide it from users'],
        correctIndex: 1,
        explanation: 'Loading CSS early prevents the user from seeing a messy, unstyled page.'
      }
    ],
    recap: 'Load styles early and scripts late to optimize the user experience.'
  },
  'html-perf-5': {
    id: 'html-perf-5',
    title: 'Resource Hints',
    todayYouAreLearning: 'How to help the browser prepare for connections to other websites.',
    whyItMatters: 'Connecting to a new site (like Google Fonts or an API) takes time. Resource hints speed this up.',
    explanation: 'Use `dns-prefetch` (looks up the IP address) and `preconnect` (starts the full connection) in your `<head>`.',
    analogy: 'Resource hints are like looking up the directions to a friend\'s house before you even get in the car. You\'re ready to go the moment you start.',
    codeExample: '<link rel="preconnect" href="https://fonts.googleapis.com">\n<link rel="dns-prefetch" href="https://api.example.com">',
    lineByLine: 'preconnect is for very important connections. dns-prefetch is a lighter version for less critical ones.',
    commonMistakes: [
      'Using preconnect for every single link on your page (it\'s too much work for the browser).',
      'Using it for your own website (the browser is already connected to your site!).',
      'Forgetting the "crossorigin" attribute for fonts.'
    ],
    practice: 'Add a preconnect hint for Google Fonts to your project.',
    challenge: 'Which is more powerful: preconnect or dns-prefetch?',
    reflectionQuestion: 'How many different websites does a typical modern page connect to?',
    quiz: [
      {
        question: 'What does "preconnect" do?',
        options: ['Downloads the whole website', 'Starts the connection process to another site early', 'Deletes old files', 'Changes the font'],
        correctIndex: 1,
        explanation: 'Preconnect handles the DNS lookup, TCP handshake, and TLS negotiation ahead of time.'
      },
      {
        question: 'When should you use dns-prefetch?',
        options: ['For your own site', 'For external sites you might need later', 'To make images smaller', 'To hide your IP address'],
        correctIndex: 1,
        explanation: 'dns-prefetch is a good "just in case" hint for external resources.'
      }
    ],
    recap: 'Use resource hints to shave precious milliseconds off your load time.'
  },
  'html-real-1': {
    id: 'html-real-1',
    title: 'Structuring a Blog Post',
    todayYouAreLearning: 'How to use everything you\'ve learned to build a professional article layout.',
    whyItMatters: 'Blog posts are one of the most common things you\'ll build. A good structure is essential for SEO and readability.',
    explanation: 'A blog post should use an `<article>` tag, with a `<header>` for the title/date, `<section>` tags for the content, and a `<footer>` for author info.',
    analogy: 'Structuring a blog post is like writing a well-organized essay with a clear title, introduction, body paragraphs, and conclusion.',
    codeExample: '<article>\n  <header>\n    <h1>My First Blog Post</h1>\n    <p>Published on April 3, 2026</p>\n  </header>\n  <section>\n    <p>This is the first paragraph of my amazing story...</p>\n  </section>\n  <footer>\n    <p>Written by: Jane Doe</p>\n  </footer>\n</article>',
    lineByLine: '<article> wraps the whole post. <header> holds the metadata. <section> holds the main text.',
    commonMistakes: [
      'Using only <div> tags instead of semantic tags like <article>.',
      'Not using heading levels (h1, h2, h3) correctly to show hierarchy.',
      'Forgetting to wrap the author info in a <footer>.'
    ],
    practice: 'Create a basic HTML structure for a blog post about your favorite hobby.',
    challenge: 'How would you add a "Table of Contents" using internal links (anchors)?',
    reflectionQuestion: 'How does this structure help a screen reader user navigate the post?',
    quiz: [
      {
        question: 'Which tag is best for wrapping a single, independent blog post?',
        options: ['<section>', '<article>', '<div>', '<main>'],
        correctIndex: 1,
        explanation: '<article> is designed for self-contained content like blog posts or news stories.'
      },
      {
        question: 'Where should the "Published Date" usually go?',
        options: ['In the <header> of the article', 'In the <footer> of the page', 'Outside the article', 'In a <nav>'],
        correctIndex: 0,
        explanation: 'The article header is the perfect place for titles, dates, and author names.'
      }
    ],
    recap: 'Use <article>, <header>, and <section> to build a solid blog post structure.'
  },
  'html-real-2': {
    id: 'html-real-2',
    title: 'Structuring a Product Page',
    todayYouAreLearning: 'How to build a layout for an e-commerce store.',
    whyItMatters: 'Product pages need to be clear, attractive, and easy to navigate to help people buy things.',
    explanation: 'Use a `<main>` tag for the product, a `<figure>` for the product image, and a `<table>` or `<ul>` for the technical specifications.',
    analogy: 'A product page is like a digital store shelf. You want the product to be front and center, with all the details clearly labeled.',
    codeExample: '<main>\n  <figure>\n    <img src="phone.jpg" alt="Latest Smartphone">\n    <figcaption>The new X-Phone 5000</figcaption>\n  </figure>\n  <section>\n    <h2>Features</h2>\n    <ul>\n      <li>5G Capable</li>\n      <li>100MP Camera</li>\n    </ul>\n    <button>Add to Cart</button>\n  </section>\n</main>',
    lineByLine: '<figure> groups the image and its caption. <section> holds the details and the buy button.',
    commonMistakes: [
      'Making the "Add to Cart" button hard to find.',
      'Not providing alt text for the product image.',
      'Using a table for the whole layout instead of just for data.'
    ],
    practice: 'Structure a product page for a pair of shoes.',
    challenge: 'How would you add a "Customer Reviews" section using the <aside> tag?',
    reflectionQuestion: 'What is the most important piece of information on a product page?',
    quiz: [
      {
        question: 'Which tag is great for grouping a product image and its caption?',
        options: ['<div>', '<figure>', '<section>', '<aside>'],
        correctIndex: 1,
        explanation: '<figure> and <figcaption> are perfect for images with descriptions.'
      },
      {
        question: 'What is the best way to list product features?',
        options: ['One long paragraph', 'An unordered list (<ul>)', 'A table', 'A series of headings'],
        correctIndex: 1,
        explanation: 'Lists are easy for users to scan quickly.'
      }
    ],
    recap: 'Organize product info logically to make it easy for customers to shop.'
  },
  'html-real-3': {
    id: 'html-real-3',
    title: 'Structuring a Dashboard',
    todayYouAreLearning: 'How to organize complex data and navigation for an app.',
    whyItMatters: 'Dashboards can be overwhelming. A clear HTML structure helps keep the information organized.',
    explanation: 'Use a `<nav>` for the sidebar, a `<header>` for the top bar, and a `<main>` area filled with `<section>` "widgets".',
    analogy: 'A dashboard is like the cockpit of an airplane. Everything has its place, and the most important gauges are right in front of you.',
    codeExample: '<div class="dashboard">\n  <nav>Sidebar Links</nav>\n  <div class="content">\n    <header>User Profile & Search</header>\n    <main>\n      <section>Recent Activity</section>\n      <section>Statistics Table</section>\n    </main>\n  </div>\n</div>',
    lineByLine: 'The layout is split into a sidebar (<nav>) and a main content area.',
    commonMistakes: [
      'Not using a <main> tag for the primary data.',
      'Making the navigation too complex for mobile users.',
      'Forgetting to use headings for each "widget" or section.'
    ],
    practice: 'Sketch out the HTML structure for a "Music Player" dashboard.',
    challenge: 'How would you use a <table> to show a list of recent transactions?',
    reflectionQuestion: 'How do you decide what information goes in the "main" area vs. the "sidebar"?',
    quiz: [
      {
        question: 'Which tag should you use for the dashboard\'s side navigation?',
        options: ['<aside>', '<nav>', '<header>', '<section>'],
        correctIndex: 1,
        explanation: '<nav> is the correct tag for any major navigation block.'
      },
      {
        question: 'What is a "widget" in a dashboard context?',
        options: ['A small bug', 'A self-contained section of data or tools', 'A type of button', 'A broken link'],
        correctIndex: 1,
        explanation: 'Dashboards are often made of multiple "widgets" like charts, lists, or stats.'
      }
    ],
    recap: 'Use clear, semantic sections to manage complex dashboard layouts.'
  },
  'html-real-4': {
    id: 'html-real-4',
    title: 'Structuring a Landing Page',
    todayYouAreLearning: 'How to build a high-impact marketing page.',
    whyItMatters: 'Landing pages are designed to get users to take one specific action (like signing up).',
    explanation: 'A landing page usually has a "Hero" section (introduction), a "Features" section, a "Testimonials" section, and a "Call to Action" (CTA).',
    analogy: 'A landing page is like a high-quality brochure or a movie trailer. It\'s designed to get you excited and make you want to see more.',
    codeExample: '<header>Logo & CTA</header>\n<main>\n  <section id="hero">\n    <h1>The Future of Coding</h1>\n    <button>Get Started</button>\n  </section>\n  <section id="features">...</section>\n  <section id="testimonials">...</section>\n</main>\n<footer>Links & Copyright</footer>',
    lineByLine: 'Each major part of the marketing story is in its own <section>.',
    commonMistakes: [
      'Having too many competing "Call to Action" buttons.',
      'Not using IDs to allow users to jump to different sections.',
      'Making the hero section too cluttered with text.'
    ],
    practice: 'Outline a landing page for a new mobile app.',
    challenge: 'Where is the best place to put the primary "Sign Up" button?',
    reflectionQuestion: 'Why do landing pages often have very little navigation in the header?',
    quiz: [
      {
        question: 'What is a "Hero Section"?',
        options: ['A section about superheroes', 'The main introductory part of a landing page', 'The footer', 'A hidden menu'],
        correctIndex: 1,
        explanation: 'The hero section is the first thing a user sees, usually containing a big headline and a button.'
      },
      {
        question: 'What does "CTA" stand for?',
        options: ['Code To Action', 'Call To Action', 'Click To Answer', 'Central Text Area'],
        correctIndex: 1,
        explanation: 'A Call to Action is a button or link that tells the user what to do next.'
      }
    ],
    recap: 'Structure landing pages to guide the user toward a single goal.'
  },
  'html-real-5': {
    id: 'html-real-5',
    title: 'Final Review',
    todayYouAreLearning: 'How to bring everything together and prepare for your next steps.',
    whyItMatters: 'You\'ve covered a lot of ground! This review ensures you have a solid foundation before moving on to CSS.',
    explanation: 'We\'ve learned about tags, attributes, structure, semantic HTML, forms, media, SEO, and accessibility. You are now ready to build real, professional websites.',
    analogy: 'This final review is like a pre-flight check for a pilot. You\'re making sure everything is in working order before you take off into the world of web development.',
    codeExample: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <title>My Final Project</title>\n</head>\n<body>\n  <header><h1>Success!</h1></header>\n  <main><p>I am an HTML Specialist.</p></main>\n</body>\n</html>',
    lineByLine: 'This is a complete, valid HTML5 document using everything we\'ve learned.',
    commonMistakes: [
      'Thinking you know everything (the web is always changing!).',
      'Forgetting the basics (like <!DOCTYPE>) when starting a new project.',
      'Not practicing regularly.'
    ],
    practice: 'Build a one-page portfolio using at least 10 different HTML tags you\'ve learned.',
    challenge: 'What is the next language you should learn to make your HTML look beautiful? (Hint: CSS).',
    reflectionQuestion: 'What was the most surprising thing you learned about HTML?',
    quiz: [
      {
        question: 'What is the primary role of HTML on a website?',
        options: ['Styling and colors', 'Interactivity and logic', 'Structure and content', 'Database management'],
        correctIndex: 2,
        explanation: 'HTML provides the skeleton and content of the page.'
      },
      {
        question: 'Are you ready to start styling your pages with CSS?',
        options: ['Yes!', 'Not yet'],
        correctIndex: 0,
        explanation: 'With a strong HTML foundation, you are perfectly prepared for CSS.'
      }
    ],
    recap: 'Congratulations! You are now an HTML Specialist. Keep building and keep learning.'
  },
  'what-is-coding': {
    id: 'what-is-coding',
    title: 'What is Coding?',
    todayYouAreLearning: 'The fundamental concept of programming and how humans communicate with machines.',
    whyItMatters: 'Coding is the backbone of the modern world. Understanding it opens doors to building anything you can imagine.',
    explanation: 'Coding is the process of writing instructions for a computer to execute. Computers are incredibly fast but not very smart—they need precise, step-by-step guidance to perform even the simplest tasks. We use programming languages as a bridge between human logic and machine execution.',
    analogy: 'Think of coding like writing a recipe. If you tell a robot to "make a sandwich," it won\'t know where to start. You must tell it: 1. Open the cupboard. 2. Take out two slices of bread. 3. Spread peanut butter on one slice. That level of detail is exactly what coding is.',
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
    explanation: 'A `<form>` wraps various input elements like `<input type="text">`, `<input type="email">`, and `<button>`. We use `<label>` tags to describe what each input is for, which is vital for accessibility.',
    analogy: 'A form is like a physical application at a bank. You have boxes to fill in your name, address, and a "Submit" button at the bottom to hand it over to the teller.',
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
};

