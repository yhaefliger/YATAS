import Plausible from "plausible-tracker";

const { trackEvent, trackPageview, enableAutoOutboundTracking } = Plausible({
    domain: "zapparov.co.uk",
    apiHost: "https://zapparov.co.uk",
});