#!/usr/bin/env node
// running npm-gui development version
var npmGuiServer = require('./dist/server/main.js').default;
var args = process.argv.slice(2);
var host = null;
var port = null;
if (args[0]) {
    host = args[0].split(':')[0];
    port = args[0].split(':')[1];
}
npmGuiServer(host, port);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvZ3VpL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFFQSxzQ0FBc0M7QUFDdEMsSUFBTSxZQUFZLEdBQUcsT0FBTyxDQUFDLHVCQUF1QixDQUFDLENBQUMsT0FBTyxDQUFDO0FBRTlELElBQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ25DLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztBQUNoQixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7QUFDaEIsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUU7SUFDWCxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM3QixJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztDQUM5QjtBQUNELFlBQVksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMifQ==