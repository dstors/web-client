const dsteem = require("dsteem");
var Remarkable = require("remarkable");

let opts = {};

const md = new Remarkable({ html: true, linkify: true });

//connect to production server
opts.addressPrefix = "STM";
opts.chainId =
	"0000000000000000000000000000000000000000000000000000000000000000";

//connect to server which is connected to the network/production
export const client = new dsteem.Client("https://api.steemit.com");

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
