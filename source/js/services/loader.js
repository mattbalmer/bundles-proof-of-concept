const loader = {
    base: '/js/',

    load(bundle) {
        return new Promise((resolve, reject) => {
            let src = loader.base + bundle + '.js';
            let script = document.createElement("script");

            script.type = "text\/javascript";
            script.onerror = () => reject();
            script.onload = () => resolve();

            document.head.appendChild(script);
            script.src = src;
        })
    }
};

export default loader;