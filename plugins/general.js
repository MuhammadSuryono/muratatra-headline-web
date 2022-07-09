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
  // Inject $hello(msg) in Vue, context and store.
  inject('substring', substring)
  inject('queryUrl', queryUrl)
  // For Nuxt <= 2.12, also add 👇
  // context.$hello = hello
}
