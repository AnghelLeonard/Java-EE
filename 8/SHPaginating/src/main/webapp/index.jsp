
<!DOCTYPE html>
<html>
    <head>
        <script>document.write('<base href="' + document.location + '" />');</script>
        <title>PrimeNG + Spring</title>

        <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/node_modules/primeui/themes/omega/theme.css" />
        <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/app/resources/icons/css/font-awesome.min.css" />
        <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/node_modules/primeui/primeui-ng-all.min.css" />
        <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/app/resources/css/site.css"/>

        <script src="${pageContext.request.contextPath}/node_modules/es6-shim/es6-shim.min.js"></script>
        <script src="${pageContext.request.contextPath}/node_modules/zone.js/dist/zone.js"></script>
        <script src="${pageContext.request.contextPath}/node_modules/reflect-metadata/Reflect.js"></script>
        <script src="${pageContext.request.contextPath}/node_modules/systemjs/dist/system.src.js"></script>
        <script src="${pageContext.request.contextPath}/node_modules/primeui/primeui-ng-all.min.js"></script>
        <script src="${pageContext.request.contextPath}/systemjs.config.js"></script>
        <script>
            System.import('app').catch(function (err) {
                console.error(err);
            });
        </script>
    </head>

    <body>
    <my-app>Loading...</my-app>
    <form>
        <input type="button" onClick="history.go(0)" VALUE="Refresh">
    </form>
</body>
</html>
