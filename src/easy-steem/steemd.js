const dsteem = require("dsteem");
var Remarkable = require("remarkable");

let opts = {};

const md = new Remarkable({ html: true, linkify: true });

let testnet = false;

//connect to production or test server
opts.addressPrefix = (testnet) ? "TST" : "STM";
opts.chainId = (testnet)
	? "46d82ab7d8db682eb1959aed0ada039a6d49afa1602491f93dde9cac3e8e6c32"
	: "0000000000000000000000000000000000000000000000000000000000000000";

//connect to server which is connected to the network/production
export const client = new dsteem.Client(
	testnet
	? "https://testnet.steemitdev.com"
	: "https://api.steemit.com"
);

export const renderMd = content => md.render(content);

export const handleDiscussions = rawResponse => {
	var posts = [];
	rawResponse.forEach(post => {
		const json = JSON.parse(post.json_metadata);
		const image = json.image ? json.image[0] : "";
		const title = post.title;
		const author = post.author;
		const created = new Date(post.created).toDateString();
		const permlink = post.permlink;
		const pending_payout_value = post.pending_payout_value;
		const active_votes_count = post.active_votes.length;

		const content = renderMd(post.body);

		posts.push({
			active_votes_count,
			content,
			permlink,
			json,
			image,
			title,
			author,
			created,
			pending_payout_value
		});
	});

	return posts;
};

export const getDynamicGlobalProperties = () => client.call('condenser_api', 'get_dynamic_global_properties', []);