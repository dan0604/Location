namespace Location.Models
{
    public sealed record UserModel
    {
        public string? UserName { get; set; }
        public string? PassWord { get; set; }
        public string? ReturnUrl { get; set; }
    }
}
