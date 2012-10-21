# Create your views here.
from django.views.generic import TemplateView

class IndexView(TemplateView):
    template_name = "index.html"

class StaticFileView(TemplateView):
    
    def get_template_names(self):
        return [self.args[0]]
