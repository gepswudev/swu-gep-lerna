<script>
      function today() {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate()).toDateString();
  }
</script>
<div class="container mx-auto p-8">

    <h2 class="text-3xl font-bold mb-4">Welcome to Department of Guidance and Educational Psychology, Faculty of Education, Srinakharinwirot University Website!</h2>

    <p class="text-gray-700 mb-6">
      This page informs you about the use of cookies and other tracking technologies
      on our website, as required by the Thailand Personal Data Protection Act (PDPA).
      By continuing to use our website, you consent to the use of cookies as described
      in this Cookies Consent.
    </p>

    <h2 class="text-xl font-bold mb-2">What are Cookies?</h2>
    <p class="text-gray-700 mb-6">
      Cookies are small text files that are placed on your device (computer, smartphone,
      or tablet) when you visit a website. They allow the website to recognize your
      device and store certain information about your browsing preferences and behavior.
    </p>

    <h2 class="text-xl font-bold mb-2">Types of Cookies We Use</h2>
    <ul class="list-disc ml-6 mb-6">
      <li class="text-gray-700">
        Essential Cookies: These cookies are necessary for the functioning of the website
        and enable core features such as page navigation and access to secure areas
        of the site. The website cannot function properly without these cookies.
      </li>
      <li class="text-gray-700">
        Functional Cookies: These cookies enhance the functionality of the website by
        remembering your preferences, such as language preferences, font size, or region
        selection. They help provide a more personalized experience.
      </li>
      <li class="text-gray-700">
        Analytical or Performance Cookies: These cookies allow us to track website usage
        and measure performance. They provide us with valuable information to improve
        the website and enhance the user experience.
      </li>
    </ul>

    <h2 class="text-xl font-bold mb-2">Consent and Control of Cookies</h2>
    <p class="text-gray-700 mb-6">
      When you visit our website for the first time, you will be presented with a cookie
      banner seeking your consent to use non-essential cookies, such as functional,
      analytical, and marketing cookies. By clicking "Accept" on the banner, you are
      giving your explicit consent to the use of these cookies. If you do not wish to
      consent to the use of non-essential cookies, you can click "Reject" or manage your
      cookie preferences in the Cookie Settings.
    </p>

    <h2 class="text-xl font-bold mb-2">How to Manage Cookies</h2>
    <p class="text-gray-700 mb-6">
      You can control and manage cookies by adjusting your browser settings. Most web
      browsers allow you to accept or reject cookies, delete cookies from your device,
      or notify you when a cookie is being sent. Please note that blocking cookies may
      impact the functionality and performance of our website.
    </p>

    <h2 class="text-xl font-bold mb-2">Third-Party Cookies</h2>
    <p class="text-gray-700 mb-6">
      We may also use third-party services on our website, such as analytics tools and
      social media plugins. These third-party services may place cookies on your device
      for their purposes. We do not have control over these cookies. You can review the
      respective privacy policies of these third-party services for more information
      on their data practices.
    </p>

    <h2 class="text-xl font-bold mb-2">Data Protection</h2>
    <p class="text-gray-700 mb-6">
      We are committed to protecting your personal data in accordance with the Thailand
      PDPA and our Privacy Policy. For more information about how we process personal
      data, please refer to our Privacy Policy.
    </p>

    <h2 class="text-xl font-bold mb-2">Contact Us</h2>
    <p class="text-gray-700 mb-6">
      If you have any questions or concerns regarding cookies or our data practices,
      please contact us at Srinakharinwirot University.
    </p>

    <h2 class="text-xl font-bold mb-2">Updates to this Cookies Consent</h2>
    <p class="text-gray-700 mb-6">
      We may update this Cookies Consent from time to time to reflect changes in our
      data practices or legal requirements. The updated version will be posted on this
      page with a revised effective date.
    </p>

    <h2 class="text-xl font-bold mb-2">Effective Date</h2>
    <p class="text-gray-700 mb-6">This Cookies Consent is effective as of {today()}.</p>

  </div>

  <svelte:head>
    <title>Cookies | ภาควิชาการแนะแนวและจิตวิทยาการศึกษา - มศว</title>
    <meta
      property="og:title"
      content="Cookies | ภาควิชาการแนะแนวและจิตวิทยาการศึกษา - มศว"
    />
    <meta
      property="og:description"
      content="ภาควิชาการแนะแนวและจิตวิทยาการศึกษา คณะศึกษาศาสตร์ มหาวิทยาลัยศรีนครินทรวิโรฒ"
    />
    <meta property="og:url" content={window.location} />
  </svelte:head>