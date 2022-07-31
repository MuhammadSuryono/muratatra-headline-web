export default (context, inject) => {
  const substring = (text, limit = 500) => {
    if (text.length > limit) return `${text.substring(0,limit)}...`;
    else return text;
  }

  const queryUrl = () => {
    return new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop),
    });
  }

  const titleTab = (title = null) => {
    if (title === null) return process.env.APP_NAME;
    return `${title} | ${process.env.APP_NAME ?? 'Muratara Headline'}`
  }

  const convertDate = (dateString) => {
    let d = new Date(dateString);
    let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
    let mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d);
    let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
    let hour = new Intl.DateTimeFormat('en', { hour: '2-digit', hour12: false }).format(d);
    let minute = new Intl.DateTimeFormat('en', { minute: '2-digit' }).format(d);
    let sec = new Intl.DateTimeFormat('en', { second: '2-digit' }).format(d);
    return `${da} ${mo} ${ye} ${hour}:${minute}:${sec}`;
  }

  // Inject $hello(msg) in Vue, context and store.
  inject('substring', substring)
  inject('queryUrl', queryUrl)
  inject('titleTab', titleTab)
  inject('convertDate', convertDate)
  // For Nuxt <= 2.12, also add 👇
  // context.$hello = hello
}
