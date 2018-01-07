using AngularTestApp.DAL;
using System.Linq;
using System.Web.Mvc;
using Newtonsoft.Json;
using AngularTestApp.Models;
using System.Data.Entity;

namespace AngularTestApp.Controllers
{
    public class PostController : Controller
    {
        ArticleContext db = new ArticleContext();
        // GET: Post
        public ActionResult Index()
        {
            object list = JsonConvert.SerializeObject(db.Posts.ToList(), new JsonSerializerSettings()
            {
                PreserveReferencesHandling = PreserveReferencesHandling.Objects,
                Formatting = Formatting.Indented
            });
            return View("Index", list);
        }

        [HttpPost]
        public ActionResult AddPost(Post newPost)
        {
            db.Posts.Add(newPost);
            int res = db.SaveChanges();
            return Json(new { status = res, Post = newPost });
        }

        [HttpPost]
        public ActionResult EditPost(Post editedPost)
        {
            db.Entry(editedPost).State = EntityState.Modified;
            int res = db.SaveChanges();
            return Json(new { status = res });
        }

        [HttpPost]
        public ActionResult DeletePost(int id)
        {
            db.Posts.Remove(db.Posts.FirstOrDefault(item => item.PostID == id));
            int res = db.SaveChanges();
            return Json(new { status = res });
        }
    }
}