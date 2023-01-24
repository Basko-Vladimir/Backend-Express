import {Router} from "express";
import {basicAuthValidation} from "../middlewares/basic-auth-validation";
import {blogRequestBodyValidation} from "../middlewares/blogs/blog-request-body-validation";
import {requestErrorsValidation} from "../middlewares/request-errors-validation";
import {postBodyCommonFieldsValidation} from "../middlewares/posts/post-body-common-fields-validation";
import {blogIdParamValidation} from "../middlewares/blogs/blog-id-param-validation";
import {commonQueryParamsSanitization} from "../middlewares/query-params-sanitization";
import {iocContainer} from "../../composition-root";
import {BlogsController} from "../controllers/blogs-controller";
import {parseUserToken} from "../middlewares/parse-user-token";

export const blogsRouter = Router({});
const blogsController = iocContainer.resolve(BlogsController);

blogsRouter.get("/", commonQueryParamsSanitization, blogsController.getAllBlogs.bind(blogsController));
blogsRouter.get("/:id", blogsController.getBlogById.bind(blogsController));

blogsRouter.post("/",
	basicAuthValidation,
	blogRequestBodyValidation,
	requestErrorsValidation,
	blogsController.createBlog.bind(blogsController)
);

blogsRouter.put("/:id",
	basicAuthValidation,
	blogRequestBodyValidation,
	requestErrorsValidation,
	blogsController.updateBlog.bind(blogsController)
);

blogsRouter.delete("/:id",
	basicAuthValidation,
	requestErrorsValidation,
	blogsController.deleteBlog.bind(blogsController)
);

blogsRouter.post("/:blogId/posts",
	basicAuthValidation,
	parseUserToken,
	blogIdParamValidation,
	postBodyCommonFieldsValidation,
	requestErrorsValidation,
	blogsController.createPostByBlogId.bind(blogsController)
);

blogsRouter.get(
	"/:blogId/posts",
	parseUserToken,
	blogIdParamValidation,
	commonQueryParamsSanitization,
	blogsController.getAllPostsByBlogId.bind(blogsController) as any
);