using AngularTestApp.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Linq;
using System.Web;

namespace AngularTestApp.DAL
{
    public class ArticleContext : DbContext
    {
        public ArticleContext() : base("ArticleContext")
        {
        }

        public DbSet<Post> Posts { get; set; }
        public DbSet<Comment> Comments  { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
            Database.SetInitializer<ArticleContext>(null);
            base.OnModelCreating(modelBuilder);
        }
    }
}