$(document).ready(function () {
  // Configure Everflow tracking
  EF.configure({
    tld: "edgeboost.bet",
  });
  window.EF = EF;

  // Get affiliate tracking parameters
  const affid = window.EF.urlParameter("affid");
  const oid = window.EF.urlParameter("oid");

  // If both tracking parameters are present
  if (affid && oid) {
    // Track the click event
    window.EF.click({
      offer_id: oid,
      affiliate_id: affid,
    });

    // Build the tracking query string
    const trackingParams = `?oid=${oid}&affid=${affid}`;

    // List of all signup/signin link selectors
    const linkSelectors = [
      ".action-btn", // Call to Action buttons
      ".top-sign-up", // Floating signup button
      'a[href*="/account/register"]', // Any registration links
      'a[href*="/account/login"]', // Any login links
    ];

    // Modify all relevant links
    linkSelectors.forEach((selector) => {
      $(selector).each(function () {
        const $link = $(this);
        const baseUrl = $link.attr("href").split("?")[0]; // Remove any existing query params
        $link.attr("href", baseUrl + trackingParams);
      });
    });

    // Log for debugging
    console.log("Everflow Affiliate tracking parameters added:", {
      affid: affid,
      oid: oid,
      trackingParams: trackingParams,
    });
  } else {
    console.log("No affiliate tracking parameters found in URL");
  }
});
